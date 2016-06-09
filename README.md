# Introduction

This project was originally started because I wanted to view/edit/use large amounts of genetic data that was not easily scrapable. I also wanted to actually make a project with node and docker, so here we are.

## Usage

The usage is going to change soon, as I plan on putting Dockerfiles in, but this will work for now.

First, if you don't have docker, you need to install it.
After that, to get the database up and running, you can use the script files.

```Bash
cd database
./downloadDb.sh
./startSql.sh
```

To start the node service, you can run:
```Bash
node app.js
```

To actually use the service, you can enter in your browser:
```bash
127.0.0.1:3000/snp_id?=#
```
Here, '#' represents your snp number.


## Eventual TODO
* Extend query functions.
* Reorganize code to make it easier to maintain.
* Add Dockerfiles for quick building and running.
* Add package.json.
* Add unit tests.

