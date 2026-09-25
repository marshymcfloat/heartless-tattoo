"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import styles from "./tattoo-style-select.module.css";

const options = ["Blackwork", "Realism", "B&G Portrait", "Minimal", "Custom tattoo", "Not sure yet"];

export default function TattooStyleSelect({ labelledBy, onChange }: {
  labelledBy: string;
  onChange: () => void;
}) {
  const id = useId();
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [opensAbove, setOpensAbove] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [invalid, setInvalid] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const searchRef = useRef({ text: "", time: 0 });
  const listId = `${id}-options`;
  const errorId = `${id}-error`;

  useEffect(() => {
    if (!open) return;
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  useEffect(() => {
    const list = listRef.current;
    const option = list?.children[activeIndex] as HTMLElement | undefined;
    if (!list || !option) return;
    if (option.offsetTop < list.scrollTop) list.scrollTop = option.offsetTop;
    else if (option.offsetTop + option.offsetHeight > list.scrollTop + list.clientHeight) {
      list.scrollTop = option.offsetTop + option.offsetHeight - list.clientHeight;
    }
  }, [activeIndex, open]);

  function selectOption(index: number) {
    if (index < 0 || index >= options.length) return;
    setValue(options[index]);
    setActiveIndex(index);
    setInvalid(false);
    setOpen(false);
    searchRef.current = { text: "", time: 0 };
    onChange();
  }

  function openList(fallback = 0) {
    const bounds = triggerRef.current?.getBoundingClientRect();
    if (bounds) {
      const below = window.innerHeight - bounds.bottom;
      setOpensAbove(below < 340 && bounds.top > below);
    }
    const selected = options.indexOf(value);
    setActiveIndex(selected >= 0 ? selected : fallback);
    setOpen(true);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      if (!open) openList(direction === 1 ? 0 : options.length - 1);
      else setActiveIndex((index) => (index + direction + options.length) % options.length);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      if (!open) openList();
      setActiveIndex(event.key === "Home" ? 0 : options.length - 1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) selectOption(activeIndex);
      else openList();
    } else if (event.key === "Escape") {
      if (open) event.preventDefault();
      setOpen(false);
    } else if (event.key === "Tab") {
      if (open) selectOption(activeIndex);
    } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      const now = performance.now();
      const text = (now - searchRef.current.time < 700 ? searchRef.current.text : "") + event.key.toLowerCase();
      searchRef.current = { text, time: now };
      const query = [...text].every((letter) => letter === text[0]) ? text[0] : text;
      const start = open ? activeIndex : options.indexOf(value);
      const index = options.findIndex((_, step) => options[(start + step + 1) % options.length].toLowerCase().startsWith(query));
      if (index >= 0) {
        const match = (start + index + 1) % options.length;
        if (open) setActiveIndex(match);
        else selectOption(match);
      }
    }
  }

  return (
    <div ref={rootRef} className={styles.root} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <select
        className={styles.native}
        name="style"
        value={value}
        required
        tabIndex={-1}
        aria-hidden="true"
        onChange={(event) => selectOption(options.indexOf(event.target.value))}
        onInvalid={(event) => {
          event.preventDefault();
          setInvalid(true);
          triggerRef.current?.focus();
        }}
      >
        <option value="" disabled>Select a style</option>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        role="combobox"
        aria-labelledby={labelledBy}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open ? `${id}-${activeIndex}` : undefined}
        aria-required="true"
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? errorId : undefined}
        data-placeholder={!value}
        onClick={() => open ? setOpen(false) : openList()}
        onKeyDown={handleKeyDown}
      >
        <span>{value || "Select a style"}</span>
        <svg className={styles.chevron} viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.5" /></svg>
      </button>
      {open && (
        <div className={styles.panel} data-above={opensAbove}>
          <div className={styles.panelHeading} aria-hidden="true"><span>Choose your style</span><span>01—{String(options.length).padStart(2, "0")}</span></div>
          <ul ref={listRef} id={listId} className={styles.options} role="listbox" aria-labelledby={labelledBy} data-lenis-prevent>
            {options.map((option, index) => (
              <li
                key={option}
                id={`${id}-${index}`}
                className={styles.option}
                role="option"
                aria-selected={value === option}
                data-active={activeIndex === index}
                onPointerMove={() => setActiveIndex(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => { selectOption(index); triggerRef.current?.focus(); }}
              >
                <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span>{option}</span>
                {value === option && <svg className={styles.check} viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="1.5" /></svg>}
              </li>
            ))}
          </ul>
        </div>
      )}
      {invalid && <p className={styles.error} id={errorId} role="alert">Please choose a tattoo style.</p>}
    </div>
  );
}
