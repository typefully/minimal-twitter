// Credit to @webbertakken for the gist:
// https://gist.github.com/webbertakken/ed82572b50f4e166562906757aede40a

const { readdir, readFile, rename, writeFile } = require("fs/promises")
const { resolve } = require("path")

const getFilesInDirectoryRecursively = async (directory) => {
  const dirents = await readdir(directory, { withFileTypes: true })

  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(directory, dirent.name)
      return dirent.isDirectory() ? getFilesInDirectoryRecursively(res) : res
    })
  )
  return Array.prototype.concat(...files)
}

;(async () => {
  // Replace underscores, which can't be used in chrome extensions
  console.log(`Sanitizing for extension build...`)
  await rename("out/_next", "out/next")
  const files = await getFilesInDirectoryRecursively("out")
  await Promise.all(
    files
      .filter(
        (file) =>
          file.endsWith(".html") || file.endsWith(".js") || file.endsWith("css")
      )
      .map(async (file) => {
        const data = await readFile(file, "utf8")
        const result = data
          .replace(/\/_next\//g, "/next/")
          .replace(/\\\/_next\\\//g, "\\/next\\/")
        await writeFile(file, result, "utf8")
      })
  )
})()
