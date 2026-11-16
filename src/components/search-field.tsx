import { Search, X } from 'lucide-react'
import { Button, Input } from '@/components/ui'

type SearchFieldProps = {
  value: string
  onChange: (value: string) => void
  placeholder: string
}

export const SearchField = ({ value, onChange, placeholder }: SearchFieldProps) => (
  <div className="relative flex-1">
    <Search
      size={16}
      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
    />
    <Input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      aria-label={placeholder}
      className="h-11 pl-9 pr-10 [&::-webkit-search-cancel-button]:hidden"
    />
    {value && (
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1/2 -translate-y-1/2"
        onClick={() => onChange('')}
        aria-label="Limpar busca"
      >
        <X size={16} />
      </Button>
    )}
  </div>
)
