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