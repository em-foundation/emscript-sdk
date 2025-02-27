# EM&bull;Script SDK v26

## VERSION-26.2.0-dev
* `adi.max326xx` distro package with support for `MAX32655FTRHR` board
* **Setup** and **Board** status-bar items in VS Code

## VERSION-26.1.3
* optional `inherits` parameter for `em.$declare`
* use of `$range` in `for of` loops

## VERSION-26.1.2
* minor doc improvements
* formatting changes on combo example
* fixed `for of` iterator support for `$factory` objects;&thinsp; see `em.utils/AlarmMgr`

## VERSION-26.1.1
* inagural public release
* setup using `npm install @em-foundation/emscript-sdk`

## VERSION-26.0.2
* build using github actions
* build emscript (minified main.js)
* new `emscript load` sub-command
* new VS Code `Build and Load` context menu item
* new VS Code `Build Meta-Program` context menu item
* support of `em$onexit()` callbacks when halting
* fixes bug in alarm_mgr

## VERSION-26.0.1

* baseline release candidate
* installation via `git clone` and `npm clean-install`
* `em.core` and `ti.cc23xx` packages at parity with v24/v25 generation
* working VS Code extension available in `.vsix` file
