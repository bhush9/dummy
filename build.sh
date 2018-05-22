#!/bin/bash

pluto update planet.ini
ruby -r 'jekyll/planet' -e 'JekyllPlanet.main'

# Workaround for non-complete image urls in Bhushan Shah's blog
for post in _posts/*; do
	if grep "author:"  $post | grep "Bhushan Shah" >/dev/null; then
		sed -i -e 's_/images_http://blog.bshah.in/images_g' $post
	fi
done

jekyll build
