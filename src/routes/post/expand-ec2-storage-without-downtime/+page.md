---
draft: false
title: How to Expand EC2 Storage Without Downtime
date: 2026-03-04 10:00:00
tags: ['aws','ec2','devops']
description: "Running out of disk space on EC2? You can expand storage without stopping your instance. Here's how."
slug: expand-ec2-storage-without-downtime
is_featured: false
---

You're running an EC2 instance, disk usage hits 95%, deployments start failing, and eventually you get "No space left on device".

AWS lets you expand EBS volumes live, without stopping the instance. Here's the whole procedure.

---

## The problem

When you resize an EBS volume in the AWS Console, AWS does expand the underlying disk. Your OS inside the instance has no idea, though. The partition and filesystem still report the old size.

So after "supposedly" resizing, you get this:

```bash
$ df -h
Filesystem       Size  Used Avail Use% Mounted on
/dev/root         58G   55G  3.1G  95% /
```

Still 58G even though you just upgraded to 120GB. That's the part you have to fix yourself.

---

## Step 1: resize the EBS volume in the AWS Console

1. Open the AWS Console, go to EC2 -> Volumes
2. Select the volume attached to your instance
3. Click Actions -> Modify Volume
4. Enter the new size (e.g., `120` GB)
5. Click Modify and confirm

This works without stopping your instance for gp2, gp3, io1, and io2 volume types. Give it a minute or two to finish before moving on.

---

## Step 2: SSH into your instance

Connect to the instance and check the current disk layout:

```bash
lsblk
```

The kernel recognises the new disk size, but the partition hasn't been extended:

```
NAME         MAJ:MIN  SIZE
nvme0n1      259:0    120G   <- new size is here
└─nvme0n1p1  259:1     58G   <- but partition is still old
```

---

## Step 3: grow the partition

```bash
sudo growpart /dev/nvme0n1 1
```

That extends partition `1` to use all the available space on the disk.

---

## Step 4: extend the filesystem

Now resize the filesystem to fill the newly expanded partition.

For ext4, which is the Ubuntu default:

```bash
sudo resize2fs /dev/root
# or
sudo resize2fs /dev/nvme0n1p1
```

For XFS, the default on Amazon Linux 2 and AL2023:

```bash
sudo xfs_growfs -d /
```

---

## Step 5: verify

```bash
df -h
```

You should see the full size now:

```bash
Filesystem       Size  Used Avail Use% Mounted on
/dev/root        117G   55G   62G  47% /
```

From 3.1G free to 62G free.

---

## Quick reference

| Step | Command |
|------|---------|
| Check disk layout | `lsblk` |
| Check filesystem usage | `df -h` |
| Grow partition | `sudo growpart /dev/nvme0n1 1` |
| Extend filesystem (ext4) | `sudo resize2fs /dev/root` |
| Extend filesystem (XFS) | `sudo xfs_growfs -d /` |

---

## Things to keep in mind

The whole process happens on a live instance, so there's no downtime. The AWS-side change takes a few minutes, so wait for the volume state to show "optimizing" or "completed" before you run any of the commands.

Device names vary. Use `lsblk` to confirm whether your disk is `/dev/xvda` or `/dev/nvme0n1` rather than copying the names above.

Ubuntu uses ext4; Amazon Linux 2 and AL2023 use XFS by default. That decides which of the two resize commands you need.

---

## Wrapping up

Expanding EC2 storage is two parts: resize the volume in AWS, then extend the partition and filesystem inside the OS. Once you know the steps it takes under two minutes and the instance never goes offline.

If you keep hitting disk limits, put a CloudWatch alarm on disk usage so you catch it earlier.
