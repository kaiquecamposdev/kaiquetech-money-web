import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import dayjs from 'dayjs'
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Transaction } from '@/contexts/TransactionsContext'
import { formatCurrency } from '@/utils/format-currency'

// date: z.date().default(new Date()),
// name: z.string().max(255),
// description: z.string().max(255).nullable(),
// category: z.string().max(255).nullable(),
// subCategory: z.string().max(255).nullable(),
// price: z.coerce.number().min(1).default(0),
// discount: z.coerce.number().min(1).default(0).nullable(),
// tax: z.coerce.number().min(1).default(0).nullable(),
// paymentMethod: z.enum(['Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'Pix']),

const data: Transaction[] = [
  {
    id: 'm5gr84i9',
    client: 'Lucas',
    description: 'Descrição da compra 1',
    category: 'Categoria 1',
    subCategory: 'Subcategoria 1',
    price: 316,
    discount: 10,
    tax: 5,
    paymentMethod: 'Dinheiro',
    date: new Date('2023-04-01T12:00:32'),
  },
  {
    id: '3u1reuv4',
    client: 'Antônio',
    description: 'Descrição da compra 2',
    category: 'Categoria 2',
    subCategory: 'Subcategoria 2',
    price: 450,
    discount: null,
    tax: 8,
    paymentMethod: 'Cartão de Crédito',
    date: new Date('2023-04-02T12:30:00'),
  },
  {
    id: '4j2k1l4j',
    client: 'Marcos',
    description: 'Descrição da compra 3',
    category: 'Categoria 3',
    subCategory: 'Subcategoria 3',
    price: 120,
    discount: 5,
    tax: 9,
    paymentMethod: 'Cartão de Débito',
    date: new Date('2023-04-03T12:55:43'),
  },
  {
    id: '5mn6b7v8',
    client: 'Alberto',
    description: 'Descrição da compra 4',
    category: 'Categoria 4',
    subCategory: 'Subcategoria 4',
    price: 789,
    discount: 15,
    tax: null,
    paymentMethod: 'Pix',
    date: new Date('2023-04-04T13:10:12'),
  },
  {
    id: '6n7m8o9p',
    client: 'Carlos',
    description: 'Descrição da compra 5',
    category: 'Categoria 5',
    subCategory: 'Subcategoria 5',
    price: 560.42,
    discount: 20.23,
    tax: 6,
    paymentMethod: 'Cartão de Crédito',
    date: new Date('2023-04-05T13:30:00'),
  },
]

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
    id: 'Sub-categoria',
    accessorKey: 'subCategory',
    header: ({ column }) => (
      <div className="flex justify-start">
        <Button
          variant="ghost"
          className="gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Sub-categoria
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('Sub-categoria')}</div>
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

      const formatted = dayjs(date).format('DD/MM/YYYY HH:mm:ss')

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: 'Ações',
    enableHiding: false,
    cell: ({ row }) => {
      const transaction = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(transaction.id)}
            >
              Copiar ID da transação
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled={true}>
              Visualizar cliente
            </DropdownMenuItem>
            <DropdownMenuItem>
              Visualizar detalhes do pagamento
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function TransactionsTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar descrições..."
          value={
            (table.getColumn('Descrição')?.getFilterValue() as string) ?? ''
          }
          onChange={(e) =>
            table.getColumn('Descrição')?.setFilterValue(e.target.value)
          }
          className="max-w-md"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} à{' '}
          {table.getFilteredRowModel().rows.length} linha(s) selecionadas.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}

// import dayjs from 'dayjs'
// import { useContextSelector } from 'use-context-selector'

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow
// } from '@/components/ui/table'
// import { TransactionsContext } from '@/contexts/TransactionsContext'
// import { cn } from '@/lib/utils'
// import { CreatePagination } from '@/utils/create-pagination'
// import { formatCurrency } from '@/utils/format-currency'

// export function TransactionsTable() {
//   const { filteredTransactions, page } = useContextSelector(
//     TransactionsContext,
//     ({ filteredTransactions, page }) => {
//       return {
//         filteredTransactions,
//         page,
//       }
//     },
//   )

//   const paginatedTransactions = CreatePagination(filteredTransactions)

//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead>Descrição</TableHead>
//           <TableHead>Preço</TableHead>
//           <TableHead>Tipo</TableHead>
//           <TableHead>Data</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {paginatedTransactions[page].map(
//           ({ id, description, price, type, category, createdAt }) => {
//             return (
//               <TableRow key={id} className="bg-card p-2">
//                 <TableCell>{description}</TableCell>
//                 <TableCell>
//                   <span
//                     className={cn(
//                       'text-base',
//                       type === 'outcome' ? 'text-red-500' : 'text-green-500',
//                     )}
//                   >
//                     {type === 'outcome'
//                       ? formatCurrency(-price)
//                       : formatCurrency(price)}
//                   </span>
//                 </TableCell>
//                 <TableCell>{category}</TableCell>
//                 <TableCell>
//                   {dayjs(createdAt).format('DD/MM/YYYY HH:mm')}
//                 </TableCell>
//               </TableRow>
//             )
//           },
//         )}
//       </TableBody>
//     </Table>
//   )
// }
