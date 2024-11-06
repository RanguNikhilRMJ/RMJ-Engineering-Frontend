import * as XLSX from 'xlsx';

export async function readExcelFileAsTables(filePath: string): Promise<{ [key: string]: any[] }> {
  const response = await fetch(filePath);
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });

  const tables: { [key: string]: any[] } = {};

  workbook.SheetNames.forEach((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    tables[sheetName] = data;
  });

  return tables;
}