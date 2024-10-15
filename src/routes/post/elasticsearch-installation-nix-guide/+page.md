---
draft: false
title: Installing Elasticsearch on Nix
date: 2024-10-15 08:00:00
tags: ["nix", "os"]
description: "This guid walks you through every step to get Elasticsearch up and running"
slug: elasticsearch-installation-nix-guide
---

![elasticsearch image](https://antaresnet.com/wp-content/uploads/2018/07/Elasticsearch-Logo-Color-V-768x400.png)

Each database has its own advantages. MySQL and PostgreSQL are best suited for persistent and relational data, Redis is ideal for caching, NoSQL databases are designed for non-relational data, and Elasticsearch for full-text search. When building an app, choose the database that best fits your specific needs to ensure an optimal experience.

Now let's talk about how to install this Elasticsearch? If you want to go with the easiest way, just do
it with homebrew. But if you brave enough and wanna get some challenge, go with Nix. Here is how to
install it.

First, create 3 files in any folder, i suggest put it under your nix config.
```
elasticsearch-config
-- elasticsearch.yml
-- jvm.options
-- log4j2.properties
```

And here is the content of those files.

**elasticsearch.yml**
```yml
path.data: ${HOME}/elasticsearch-data
path.logs: ${HOME}/.config/nix/es-logs
http.cors.enabled: true
http.cors.allow-origin: "*"
http.cors.allow-methods: OPTIONS, HEAD, GET, POST, PUT, DELETE
http.cors.allow-headers: X-Requested-With, Content-Type, Content-Length, Authorization
http.cors.allow-credentials: true
```

Just a heads-up, this setup allows CORS for all origins (*). If you’re deploying to production, make sure to change the allow-origin setting to your specific URL for better security.

**jvm.options**
```
-Xms512m
-Xmx512m
```

**log4j2.properties**
```
status = error
name = PropertiesConfig
appender.console.type = Console
appender.console.name = ConsoleAppender
appender.console.layout.type = PatternLayout
appender.console.layout.pattern = [%d{ISO8601}][%-5p][%-25c{1.}] %m%n
rootLogger.level = info
rootLogger.appenderRef.console.ref = ConsoleAppender
```

After setup all those files, here is the devShells.
```
elasticsearch = pkgs.mkShell {
    description = "ElasticSearch";
    buildInputs = with pkgs; [
      elasticsearch
    ];
    shellHook = ''
      # Set ES_JAVA_HOME explicitly if needed
      export ES_JAVA_HOME=${pkgs.jdk}
      export ES_HOME=$(dirname $(dirname $(which elasticsearch)))
      export ES_PATH_CONF=$HOME/.config/nix/home-manager/elasticsearch-config

      # Create a log directory with appropriate permissions
      ES_LOG_DIR=$HOME/.config/nix/es-logs
      mkdir -p $ES_LOG_DIR
      chmod 755 $ES_LOG_DIR

      ES_DATA_DIR=$HOME/elasticsearch-data
      mkdir -p $ES_DATA_DIR
      chmod 755 $ES_DATA_DIR

      # Run Elasticsearch with the log directory specified
      elasticsearch -d
    '';
  };
```

Last but not least, make sure to run a `git all`, then `home-manager switch --flake
<your_home_config_name>` to apply your changes. Finally, run this command to enter the shell

```
$ export NIXPKGS_ALLOW_UNFREE=1 && nix develop --impure '.#devShells.elasticsearch'
```

Make sure to do the `NIXPKGS_ALLOW_UNFREE=1` to allow this unfree program into your nix setup. You can check out my nix config here https://github.com/nusendra/nix-home. Feel free to leave any feedback! Thanks for stopping by, and I hope this post helps you sort things out. :)
