export const D = {
  CUST: { key: 'cust', label: 'Customer', col: 'var(--cust)' },
  SALES: { key: 'sales', label: 'Sales', col: 'var(--sales)' },
  PUR: { key: 'purchase', label: 'Purchase', col: 'var(--purchase)' },
  FIN: { key: 'finance', label: 'Finance', col: 'var(--finance)' },
  LOG: { key: 'log', label: 'Logistics', col: 'var(--log)' },
  STORE: { key: 'store', label: 'Store / QC', col: 'var(--store)' },
  MGMT: { key: 'mgmt', label: 'Management', col: 'var(--mgmt)' },
  PAR: { key: 'par', label: 'Finance + Logistics', col: 'var(--par)' },
  ERP: { key: 'erp', label: 'ERP', col: 'var(--erp)' }
}
export const HX = { cust: D.CUST, sales: D.SALES, purchase: D.PUR, finance: D.FIN, log: D.LOG, store: D.STORE, mgmt: D.MGMT, par: D.PAR }
export const DEPT_KEYS = ['CUST', 'SALES', 'PUR', 'FIN', 'LOG', 'STORE', 'MGMT', 'ERP']