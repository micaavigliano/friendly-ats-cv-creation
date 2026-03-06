import { useCallback, useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"

interface IItems {
  name: string | ReactNode;
  id: number | string;
  style: string;
}

interface ITablist {
  items: IItems[];
  value?: number | string;
  onChange?: (id: number | string) => void;
}

interface ITab {
  id: number | string;
  name: string | ReactNode;
  active: number | string;
  setActive: (id: number | string) => void;
  style: string;
}

const Tab = ({ name, id, setActive, active, style }: ITab) => {
  const btnRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (id === active && btnRef.current) {
      btnRef.current.focus()
    }
  }, [id, active])

  return (
    <button
      ref={btnRef}
      role="tab"
      type="button"
      id={`tab-${id}`}
      aria-controls={`tabpanel-${id}`}
      className={style}
      onClick={() => setActive(id)}
      aria-selected={id === active}
      tabIndex={id === active ? 0 : -1}
    >
      {name}
    </button>
  )
}

const TabList = ({ items, value, onChange }: ITablist) => {
  const [active, setActiveState] = useState<number | string>(
    value ?? (items.length > 0 ? items[0].id : 0)
  )
  const tabRef = useRef<HTMLDivElement | null>(null)

  const setActive = useCallback(
    (id: number | string) => {
      setActiveState(id)
      onChange?.(id)
    },
    [onChange]
  )

  useEffect(() => {
    if (value !== undefined && value !== active) {
      setActiveState(value)
    }
  }, [value, active])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const focusedElement = document.activeElement as HTMLElement | null
      const isButtonFocused = focusedElement?.getAttribute("role") === "tab"
      const isInsideTabPanel = !!focusedElement?.closest('[role="tabpanel"]')

      if (!tabRef.current || !isButtonFocused || isInsideTabPanel) return

      const currentIndex = items.findIndex((it) => it.id === active)
      if (currentIndex === -1) return

      if (event.key === "ArrowRight") {
        const next = (currentIndex + 1) % items.length
        setActive(items[next].id)
        event.preventDefault()
      } else if (event.key === "ArrowLeft") {
        const prev = (currentIndex - 1 + items.length) % items.length
        setActive(items[prev].id)
        event.preventDefault()
      } else if (event.key === "Home") {
        setActive(items[0].id)
        event.preventDefault()
      } else if (event.key === "End") {
        setActive(items[items.length - 1].id)
        event.preventDefault()
      }
    },
    [items, active, setActive]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  return (
    <div
      role="tablist"
      aria-label="Main navigation"
      className="flex flex-row bg-slate-100 p-1 rounded-lg"
      ref={tabRef}
    >
      {items.map((item) => (
        <Tab
          id={item.id}
          name={item.name}
          active={active}
          setActive={setActive}
          key={item.id}
          style={item.style}
        />
      ))}
    </div>
  )
}

export default TabList