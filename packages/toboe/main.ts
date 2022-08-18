import knex, { Knex } from "knex"
import { queries } from "./queries/index"

type Connection = Knex.Config["connection"]
type ProviderType = "pg" | "sqlite3"

class Client {
	private client: Knex<any, unknown[]>
	private tables: string[]
	constructor(public provider: ProviderType = "pg", connection: Connection) {
		this.tables = []
		this.client = knex({
			client: this.provider,
			connection,
		})

		this.getAllTableNames()
	}

	async getAllTableNames() {
		const results = await this.client.raw(this.queries["getAllTables"]) 

		let tables: string[]
		if (this.provider === "pg") {
			tables = results.rows.map ( 
				(row: any) => row["table_name"]
			)
		} else {
			tables = results.map(
				 (row: any) => row["name"]
			)
		}
		

		this.tables = tables
		console.log(this.tables)
		return tables
	}

	get queries() {
		return queries[this.provider]
	}
}

// new Client("sqlite3", {
	// filename: "/home/yofou/Downloads/chinook/chinook.db"
// })

new Client("pg", "postgresql://postgres:b72a7eac04c51e0af989652b6516eda5fae4e7f579ae9507@localhost:5432/mydb?schema=public")

console.log(
	queries
)
