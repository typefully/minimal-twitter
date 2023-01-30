This folder contains the source files for the Mac icon. These files can be selected and dragged in the `Assets.xcassets` folder in Xcode, on the `AppIcon` tab.

The icons assets are generated from a single `mac-icon.png` file with ImageMagick, which you can install on your Mac with `brew install imagemagick`.

To generate the assets, `cd` into this folder and run:

```
convert mac-icon.png -resize 16x16 -gravity center -background transparent -extent 16x16 mac-icon-16.png
convert mac-icon.png -resize 32x32 -gravity center -background transparent -extent 32x32 mac-icon-32.png
convert mac-icon.png -resize 128x128 -gravity center -background transparent -extent 128x128 mac-icon-128.png
convert mac-icon.png -resize 256x256 -gravity center -background transparent -extent 256x256 mac-icon-256.png
convert mac-icon.png -resize 512x512 -gravity center -background transparent -extent 512x512 mac-icon-512.png
convert mac-icon.png -resize 32x32 -gravity center -background transparent -extent 32x32 mac-icon-16@2x.png
convert mac-icon.png -resize 64x64 -gravity center -background transparent -extent 64x64 mac-icon-32@2x.png
convert mac-icon.png -resize 256x256 -gravity center -background transparent -extent 256x256 mac-icon-128@2x.png
convert mac-icon.png -resize 512x512 -gravity center -background transparent -extent 512x512 mac-icon-256@2x.png
convert mac-icon.png -resize 1024x1024 -gravity center -background transparent -extent 1024x1024 mac-icon-512@2x.png
```