Setup:

```
git remote add subtree__i18n https://gitlab.com/xixi/i18n.git

git subtree add --prefix=i18n/ subtree__i18n master --squash
```

---

Update:

```
git subtree pull --prefix=i18n/ subtree__i18n master --squash
```
---

**DO NOT MAKE CHANGES TO `utils/` DIRECTORY, INSTEAD:**
```
git subtree pull --prefix=utils/ subtree__utils master --squash
```


