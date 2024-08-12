import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Transaction } from '@/contexts/TransactionsContext'
import { formatCurrency } from '@/utils/format-currency'

import { ActionsRow } from './actions-row'

export const columns: ColumnDef<Transaction>[] = [
  {
    id: 'select',
    accessorKey: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Selecione todos"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Selecione esta linha"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'Cliente',
    accessorKey: 'client',
    header: () => <div className="capitalize">Cliente</div>,
    cell: ({ row }) => (
      <div className="text-start capitalize">{row.getValue('Cliente')}</div>
    ),
  },
  {
    id: 'Descrição',
    accessorKey: 'description',
    header: ({ column }) => (
      <div className="flex justify-start">
        <Button
          variant="ghost"
          className="gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Descrição
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('Descrição')}</div>
    ),
  },
  {
    id: 'Categoria',
    accessorKey: 'category',
    header: ({ column }) => (
      <div className="flex justify-start">
        <Button
          variant="ghost"
          className="gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Categoria
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('Categoria')}</div>
    ),
  },
  {
    id: 'Subcategoria',
    accessorKey: 'subCategory',
    header: ({ column }) => (
      <div className="flex justify-start">
        <Button
          variant="ghost"
          className="gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Subcategoria
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('Subcategoria')}</div>
    ),
  },
  {
    id: 'Preço',
    accessorKey: 'price',
    header: ({ column }) => (
      <div className="flex justify-end">
        <Button
          variant="ghost"
          className="gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Valor
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const price = row.getValue('Preço') as number
      const discount = row.original.discount || 0
      const tax = row.original.tax || 0

      const formatted = formatCurrency(price - discount - tax)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: 'Data',
    accessorKey: 'date',
    header: ({ column }) => (
      <div className="flex w-full justify-end">
        <Button
          variant="ghost"
          className="gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Data
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const date = row.getValue('Data') as Date

      const formatted = dayjs(date).format('lll')

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: 'Ações',
    enableHiding: false,
    cell: ({ row }) => <ActionsRow row={row} />,
  },
]
