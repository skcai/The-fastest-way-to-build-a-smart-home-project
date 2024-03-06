# Commit Specifications

## commit convention
> Refer to [Angular's commit convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular)

## git flow

> Refer to [Git-Flow](https://danielkummer.github.io/git-flow-cheatsheet/index.html)

> Use the Sourcetree to init and manage Git-Flow branches.

- main: long-term branch, the branch that holds the latest released version.
- develop: Long-term branch, the branch that integrates developed functions.
- feature/myfeature: A feature development branch created based on the develop branch, merged into the develop branch after the development is completed, and delete the branch.
- release/vx.x.x: The version release branch created based on the develop branch can be modified for bugs, and the modified bugs can be merged back into the develop branch in time. After the version is released, it is merged into the develop branch and the master branch, and the branch is deleted.
- hotfix/myfix: A branch created based on the master branch to modify the defects of the online version. After the modification, merge it into the develop branch and the master branch, and delete the branch.
