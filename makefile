.PHONY: setup setup-additional

# setup-additional
# 1. builds nuxt app for static hosting
# 2. copies that output to proper folder in `./backend`
setup-additional:
	cd client && yarn generate
	cd client && yarn gulp --require esm copyBuildFiles
