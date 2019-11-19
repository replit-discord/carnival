.PHONY: setup setup-additional

# setup
# 1. uses pillow to generate mock assets (images for games)
# 2. copies these generated assets to proper folder in `./backend
setup:
	cd server && yarn gulp --require esm generateAssets
	cd server && yarn gulp --require esm copyAssets

# setup-additional
# 1. builds nuxt app for static hosting
# 2. copies that output to proper folder in `./backend`
setup-additional:
	cd client && yarn generate
	cd client && yarn gulp --require esm copyBuildFiles
