# dev-journal

## March 23 2023
 - Less implementations specific tests, more behaviour specific ones.
 - Pay attention to what's version specific and what's not.

 Tags: librocco, tests, versions


## March 27 2023

- Get rid of commits on local branch

`git reset --hard origin/<branch-name>`

Tags: git, commit, reset

- When you create a method on a class and you want to create a function inside that method which refers to this as the containing class instance use an arrow function because they are constantly bound to the class instance, as opposed to a classic function which has a floating binding of this; changing the context by using bind or call on the function would change this, therefore Typescript cannot infer the type of this.

[Stackoverflow](https://stackoverflow.com/questions/56204346/typescript-error-an-outer-value-of-this-is-shadowed-by-this-container)

```
class Rectangle extends BaseObject {
  // ..
  calcSize = function() {
    // The keyword "function" will cause "this" to be floating.
    // Since the function is explicitly assigned to calcSize
    // (older) TypeScript may not infer the type of "this".
    // The value of "this" can be re-bound by changing the context
    // using bind or call.
    // -> Value of "this" defaults to the class instance
    return this.width * this.length; // (potential) type Error on this line
  };

  calcSizeAsMember () {
    // This is also a classic function which will use floating binding
    // therefore "this" will be the type of the containing class.
    // The value of "this" can be re-bound by changing the context
    // using bind or call.
    // -> Value of "this" defaults to the class instance
    return this.width * this.length;
  };

  calcSizeAsArrowFunction = () => {
    // This is an arrow function which has a constantly-bound "this" keyword,
    // it is not possible to re-bind afterward.
    // The type of "this" is always the type of the containing class.
    // Changing the context using bind or call will have no effect
    // -> Value of "this" is always the class instance
    return this.width * this.length;
  };

};

```
Tags: classes, closure, this


## March 29

Command for printing out current architecture:

``

Tags: ubuntu, architecture, cmd

## April 4

```
git checkout <branch-you-want-to-rebase(change its history)>

# could be on the same branch but a different commit
# if you want to squash, use SHA of the commit before the one you want to keep
git rebase -i <branch-you-want-to-rebase-to>
```

1st screen: pick or squash the commits
ctrl S + ctrl Q

2nd screen: change or write a new commit msg
ctrl S + ctrl Q

Rebase to squash commits on local branch

tags: rebase, git, squash

## June 12

- 12 factor app
1. Codebase: app must have only one repo or multiple repos that share same root commit
2. Dependencies: app must have a dependency declaration manifest (package.json) and a dependency isolation tool (npm)
3. config: config that differs to each deploy must be separate from code ie. code can be open source at any moment without risking any credentials

## Sep 14

Import export firebase

gcloud firestore export gs://eisbuk.appspot.com/import
gsutil -m cp -r gs://eisbuk.appspot.com/import ../backup-restore/import
firebase emulators:start --import ./packages/backup-restore/import2


## Sep 28
Seeding data to local db and script for published_menu
use the pull_seed script. You need to define a TEST_DB_URL variable, which should have the format: postgresql://postgres:[YOUR-PASSWORD]@db.avevmyzjqbdxcgvoxqct.supabase.co:5432/postgres
11:01
I would like to keep YOUR_PASSWORD locked down though. So you could also do it with psql -h db.avevmyzjqbdxcgvoxqct.supabase.co -p 5432 -d postgres -U postgres

Delete all rows in table, then run this code in sql editor of supabase dash:

DO $$
DECLARE
    menu_id uuid;
BEGIN
    -- Cursor to select IDs from the menu table where status is 'Published'
    FOR menu_id IN (SELECT id FROM menu WHERE status = 'Published')
    LOOP
        -- Invoke your publish function for each menu_id
        PERFORM publish(menu_id);
    END LOOP;
END $$;

tags: Edible, postgres, supabase

### Sep 29

#!/bin/bash
echo 'Will this work? Fingers crossed!'
​
ENCRYPTED_MESSAGE_B64="A+t5yRwthyL7VriBnJYZu8ThWzb++1+xJCAHySVfxWaBqTMJxeKwkkQEEmXCD/BIQc2TIdEpYjSg
znw41ziYJDwiNbCabJu9iiARqaPr1+wqSPkN3LyL9CsZA7c9tmz/h7gsYgEjNgvMH8xXOrBkpUYs
tgI2dcOsV8Jj16dV4gsiV9OWTrHMzJSYrfNQ5gr+NeWSp/WZpZJzd9pROV9Qe3c5TCFKvJElObTI
vfbf7Dehwdmxy1kxWQS1GEKn57PN90Er5jPoFfISSTpiljAQ1mOEDJEfd5zqTQ+W8h/G0pUz9ZRy
eypCVFubAqmd8DjQwQ9Qb8Xb3Lz/TQGD6rs+d8Nruvf+B7VQxTgUtkcit+K21qn45eyIiOyjwVLB
pYUeg1PlQQyv7bl5Cx4n2oJmaVFPZNdWOZdirJJkTWFLeScY4huDvCKxFUSWlUaZwWkMrE86lwUl
UkPkgwNZrvu2VvDea8WSK21BXIs70v+p5fgMSZCm1x6CkbRRhUT9CjQR8L9eiNwnxY9LoQ7mU2H7
nN8+Li7QkBB4RjvX+hRk/unrdj24HCju7Fw6vM/2xZQmHrq/9INv2m46+d+EzwRF5oYoTS9PB5R9
0iJP93S0h80co3XDZe4WubKZ8Y3luaMgTsx+rAmwXvcl/m/1kT4Dh5l29TslE/hVCErPA472t/E="
echo "$ENCRYPTED_MESSAGE_B64"|base64 -d > /tmp/encrypted_message.bin
openssl pkeyutl -decrypt -inkey ~/.ssh/id_rsa -in /tmp/encrypted_message.bin -out -

tags: encryption, openssl


Updating rush
- change version in rush.json
- run rush update --full for a clean build

tags: rush, update, version

# Nov 2

To add an exit node
tailscale up --exit-node=pr1.tail12c83.ts.net

See the
mtr 1.1.1.1


tags: tailscale, network

# Nov 7

read the output of all commands you issue! Especially commands like git checkout fix/875-overflow where you might have forgotten a -b.
Also, before git push check if you're in the branch you intend to push!

# Dec 13

Bookings sanity check
The bug: IntervalMismatches not being caught if more than one athlete booked that slot interval
The reason: bookedSlots are reduced and keyed by their id so the last bookedSlot overwrites the others and we end up with only one bookedSLot for each slotId
The solution: associate each bookedSlot with its bookingId

# Jan 31

To increase node heap size:
This temporarily solves the heap out of memory error on rushx start in eisbuk

export NODE_OPTIONS="--max-old-space-size=8192"

To see the current (not exact but very close) value of max-old-space-size (in MB), run in your terminal

node -e 'console.log(v8.getHeapStatistics().heap_size_limit/(1024*1024))'

# Feb 8

To clear CI cache:
go to actions (actions tab, general, all actions view) -> caches
read the cache key from the end of the “Cache node modules” step (logs)

tags: CI, github, cache, actions

# Feb 23

First check your kernel version, so you won't delete the in-use kernel image, running:

uname -r

Now run this command for a list of installed kernels:

dpkg --list 'linux-image*' | grep ^ii

and delete the kernels you don't want/need anymore by running this:

sudo apt-get remove linux-image-VERSION

Replace VERSION with the version of the kernel you want to remove.

When you're done removing the older kernels, you can run this to remove ever packages you won't need anymore:

sudo apt-get autoremove

And finally you can run this to update grub kernel list:

sudo update-grub


tags: linux, boot, kernel

# Mar 1

Edible pgtap flow tips:
- in order to run the migrations for any db changes you have to run `bash ./migrate_local_db` which requires `docker compose up`
- when you run `docker compose up -d` and then rushx test:db the db container doesn;t start, you have to take down the first
- after running a migrations which fails for syntax error run this
`docker run --rm -v "$PWD:/migrations" --network host migrate/migrate -path /migrations/ -database postgres://postgres:secret@localhost:5432/postgres?sslmode=disable force [N]`
N being the version that errored out (should be printed in console)

# Apr 23 2025
Caddy
CADDY_EMAIL=silviot@gmail.com CLOUDFLARE_API_TOKEN=DBRttmrul0LHRDyXPuav1fnsxGGnBGSmiBUBoOx8 CF_ZONE_ID=e5c43f774ff0f1945ad636cba42ad246 scripts/startCaddy.js
