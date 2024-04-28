import { useQuery } from 'react-query'
import './SearchableDropdown.scss'
import { useEffect, useRef, useState } from 'react'
import { randomId64 } from '../../utilities'

interface SearchableDropdownProps<T> {
    onChange: (value: T | null) => void
    selected: T | null
    queryCallback: (query: string) => Promise<T[]>
    getKeyCallback: (option: T) => React.Key
    getLabelCallback: (option: T) => string
    getElementCallback: (option: T) => JSX.Element
    loadingElement: JSX.Element
    width?: string | number
    resultsListMaxHeight?: string | number
    placeholder?: string
    disabled?: boolean
    uppercase?: boolean
}

const SearchableDropdown = <T,>({ onChange, selected, queryCallback, getKeyCallback, getLabelCallback, getElementCallback, loadingElement, width, resultsListMaxHeight, placeholder, disabled, uppercase }: SearchableDropdownProps<T>) => {
    const [id, setId] = useState<string>('')

    const [prompt, setPrompt] = useState<string>('')
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const [isEditing, setIsEditing] = useState<boolean>(false)

    const { isLoading, data } = useQuery({ queryKey: [id, prompt], queryFn: async() => {
        return queryCallback(prompt)
    } })

    const inputRef = useRef<HTMLInputElement>(null)

    const toggle = (event: any) => {
        if (disabled) return
        setIsOpen(event.target === inputRef.current)
    }

    const selectOption = (option: T) => {
        setPrompt('')
        onChange(option)
        setIsOpen(!isOpen)
    }

    const getDisplayValue = (): string => {
        if (isEditing) return prompt
        if (selected) return getLabelCallback(selected)
        return prompt
    }

    useEffect(() => {
        setId(randomId64())
        document.addEventListener('click', toggle)

        return () => document.removeEventListener('click', toggle)
    }, [])

    const renderResults = (): React.ReactNode => {
        if (isLoading) return loadingElement

        return data!.map(value => {
            return <div key={getKeyCallback(value)} onClick={() => {
                setIsEditing(false)
                selectOption(value)
            }}>{getElementCallback(value)}</div>
        })
    }

    return (
        <div className={`searchable-dropdown ${isOpen ? 'open' : ''} ${disabled ? 'disabled' : ''}`} style={{ width: width ?? '300px' }}>
            <div className="control">
                <div className="selected-value">
                    <input ref={inputRef} type="text" value={getDisplayValue()} name="searchTerm" onChange={event => {
                        setPrompt(event.target.value)
                        setIsEditing(true)
                        onChange(null)
                    }} onClick={toggle} placeholder={placeholder} disabled={disabled} style={{ textTransform: uppercase ? 'uppercase' : undefined }}/>
                </div>

                <div className="arrow"></div>
            </div>

            <div className="options" style={{ maxHeight: resultsListMaxHeight ?? '500px' }}>
                {renderResults()}
            </div>
        </div>
    )
}

export default SearchableDropdown