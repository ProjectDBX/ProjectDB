import { glob } from "glob"
import { readFileSync } from "node:fs"
import { parse } from "node:path"

export const queries: Record<string, any> = {}

glob.sync("./**/*.sql")
	.forEach( path => {
		const parsed = parse(path)
		const folderPathArr = parsed.dir.split("/")
		const dir = {
			...parsed,
			dir: folderPathArr[folderPathArr.length - 1]
		}

		const query = readFileSync(path, "utf-8")

		if (!queries[dir.name]) queries[dir.name] = {}
		queries[dir.name][dir.dir] = query
	} )
