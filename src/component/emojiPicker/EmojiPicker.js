import { forwardRef, useEffect, useRef, useState } from "react";
import { data as emojiList } from "./data";
import EmojiButton from "./EmojiButton";
import styles from "./EmojiPicker.module.scss";

export function EmojiPicker(props, refInput) {
    const [isOpen, setIsOpen] = useState(false);
    const [emojis, setEmojis] = useState([...emojiList]);

    const containerRef = useRef(null);
    
    useEffect(() => {
        window.addEventListener('click', e => {
            if(!containerRef.current.contains(e.target)) {
                setIsOpen(false);
                setEmojis(emojiList);
            }
        });
    }, []);

    function handleClickOpen() {
        setIsOpen(!isOpen);
    }

    function handleOnClickEmoji(emoji) {
        const cursorPos = refInput.current.selectionStart;
        const text = refInput.current.value;
        const prev = text.slice(0, cursorPos);
        const next = text.slice(cursorPos);

        refInput.current.value = prev + emoji.Symbol + next;
        refInput.current.selectionStart = cursorPos + emoji.Symbol.length;
        refInput.current.selectionEnd = cursorPos + emoji.Symbol.length;
        refInput.current.focus();
    }

    return(
        <div ref={containerRef} className={styles.inputContainer}>
            <button onClick={handleClickOpen} className={styles.emojiPickerButton}>😉</button>
            {isOpen ? (
                <div className={styles.emojiPickerContainer}>
                    <div className={styles.emojiList}>
                        {emojis.map((emoji) => (
                            <EmojiButton key={emoji.Symbol} 
                            emoji={emoji} 
                            onClick={handleOnClickEmoji}/>))}
                    </div>
                </div>) : ("")
            }
        </div>
    );
}

export default forwardRef(EmojiPicker);

/*
import { forwardRef, useEffect, useRef, useState } from "react";
import { data as emojiList } from "./data";
import EmojiButton from "./EmojiButton";
import EmojiSearch from "./EmojiSearch";

import styles from "./EmojiPicker.module.scss";

export function EmojiPicker(props, refInput) {
    const [isOpen, setIsOpen] = useState(false);
    const [emojis, setEmojis] = useState([...emojiList]);

    const containerRef = useRef(null);
    useEffect(() => {
        window.addEventListener('click', e => {
            if(!containerRef.current.contains(e.target)) {
                setIsOpen(false);
                setEmojis(emojiList);
            }
        });
    }, []);

    function handleSearch(e) {
        const q = e.target.value.toLowerCase();

        if(!!q) {
            const search = emojiList.filter(emoji => {
                return (
                    emoji.name.toLowerCase().includes(q) || 
                    emoji.keywords.toLowerCase().includes(q)
                ); 
            });
            setEmojis(search);
        } else {
            setEmojis(emojiList);
        } 
    }

    function handleClickOpen() {
        setIsOpen(!isOpen);
    }

    function handleOnClickEmoji(emoji) {
        const cursorPos = refInput.current.selectionStart;
        const text = refInput.current.value;
        const prev = text.slice(0, cursorPos);
        const next = text.slice(cursorPos);

        refInput.current.value = prev + emoji.Symbol + next;
        refInput.current.selectionStart = cursorPos + emoji.Symbol.length;
        refInput.current.selectionEnd = cursorPos + emoji.Symbol.length;
        refInput.current.focus();
    }

    return(
        <div ref={containerRef} className={styles.inputContainer}>
            <button onClick={handleClickOpen} className={styles.emojiPickerButton}>😉</button>
            {isOpen ? (
                <div className={styles.emojiPickerContainer}>
                    <EmojiSearch onSearch={handleSearch}/>
                    <div className={styles.emojiList}>
                        {emojis.map((emoji) => (
                            <EmojiButton key={emoji.Symbol} 
                            emoji={emoji} 
                            onClick={handleOnClickEmoji}/>))}
                    </div>
                </div>) : ("")}
        </div>
    );
}

export default forwardRef(EmojiPicker);*/