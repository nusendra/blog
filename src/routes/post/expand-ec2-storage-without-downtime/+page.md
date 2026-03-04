---
draft: false
title: How to Expand EC2 Storage Without Downtime
date: 2026-03-04 10:00:00
tags: ['aws','ec2','devops']
description: "Running out of disk space on EC2? You can expand storage without stopping your instance. Here's how."
slug: expand-ec2-storage-without-downtime
---

So you've been running your EC2 instance and suddenly you're at 95% disk usage. Your app is sluggish, deployments are failing, and you're getting that dreaded "No space left on device" error. Sound familiar?

Good news — AWS lets you expand EBS volumes **live**, without stopping your instance. No panic, no downtime. Let's get into it.

---

## The Problem

Here's the thing. When you resize an EBS volume in the AWS Console, AWS does expand the underlying disk. But your OS inside the instance doesn't know about it yet. The partition and filesystem still show the old size.

So you might end up seeing something like this after "supposedly" resizing:

```bash
$ df -h
Filesystem       Size  Used Avail Use% Mounted on
/dev/root         58G   55G  3.1G  95% /
```

Still showing 58G even though you just upgraded to 120GB. That's what we need to fix.

---

## Step 1: Resize the EBS Volume in AWS Console

1. Open the **AWS Console** -> go to **EC2 -> Volumes**
2. Select the volume attached to your instance
3. Click **Actions -> Modify Volume**
4. Enter the new size (e.g., `120` GB)
5. Click **Modify** and confirm

This works **without stopping your instance** for gp2, gp3, io1, and io2 volume types. Wait about 1-2 minutes for the modification to complete before moving on.

---

## Step 2: SSH Into Your Instance

Connect to your EC2 instance and check the current disk layout:

```bash
lsblk
```

You should see the new disk size is recognized by the kernel, but the partition hasn't been extended yet:

```
NAME         MAJ:MIN  SIZE
nvme0n1      259:0    120G   <- new size is here
└─nvme0n1p1  259:1     58G   <- but partition is still old
```

---

## Step 3: Grow the Partition

```bash
sudo growpart /dev/nvme0n1 1
```

This extends partition `1` to use all available space on the disk.

---

## Step 4: Extend the Filesystem

Now resize the filesystem to fill the newly expanded partition.

**For ext4** (Ubuntu default):

```bash
sudo resize2fs /dev/root
# or
sudo resize2fs /dev/nvme0n1p1
```

**For XFS** (Amazon Linux 2 / AL2023 default):

```bash
sudo xfs_growfs -d /
```

---

## Step 5: Verify

```bash
df -h
```

You should now see the full size:

```bash
Filesystem       Size  Used Avail Use% Mounted on
/dev/root        117G   55G   62G  47% /
```

From 3.1G free to 62G free. Done!

---

## Quick Reference

| Step | Command |
|------|---------|
| Check disk layout | `lsblk` |
| Check filesystem usage | `df -h` |
| Grow partition | `sudo growpart /dev/nvme0n1 1` |
| Extend filesystem (ext4) | `sudo resize2fs /dev/root` |
| Extend filesystem (XFS) | `sudo xfs_growfs -d /` |

---

## Things to Keep in Mind

- **No downtime needed** — the entire process happens on a live instance
- **AWS-side changes take a few minutes** — wait for the volume state to show "optimizing" or "completed" before running the commands
- **Device names can vary** — use `lsblk` to confirm whether your disk is `/dev/xvda` or `/dev/nvme0n1`
- **Ubuntu uses ext4**, Amazon Linux 2/AL2023 uses XFS by default

---

## Wrapping Up

Expanding EC2 storage is basically a two-part process: resize the volume in AWS, then extend the partition and filesystem inside the OS. Once you know the steps, it takes less than 2 minutes and your instance never needs to go offline.

If you're regularly hitting disk limits, it might be worth setting up a **CloudWatch alarm** on disk usage so you catch it before it becomes a problem.
