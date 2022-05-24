export interface IMySQLResult {
  fieldCountL: number;
  affectedRow: number;
  insertedId: number;
  serverStatus: number;
  warningCount: number;
  message: string;
  protocol41: boolean;
  changedRows: number;
}