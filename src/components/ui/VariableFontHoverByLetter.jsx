import * as React from "react"
import { useEffect, useMemo, useRef } from "react"
import {
    motion,
    stagger,
    useAnimate,
} from "framer-motion"

const useIsStaticRenderer = () => false

/**
 * VariableFontHoverByLetter — text whose letters animate their `wght`
 * (font-variation-settings) on hover, staggered letter-by-letter.
 */
export default function VariableFontHoverByLetter(props) {
    props = { ...COMPONENT_DEFAULTS, ...props }
    const {
        label,
        fromWeight,
        toWeight,
        staggerDuration,
        staggerFrom,
        fontSize,
        color,
        onClick,
        style,
        className,
    } = props

    // Resting / hover wght as variation-settings strings.
    const fromSettings = `'wght' ${fromWeight}`
    const toSettings = `'wght' ${toWeight}`

    // Stagger duration is in milliseconds; convert to seconds for stagger().
    const staggerSec = Math.max(0, staggerDuration) / 1000

    const isStatic = useIsStaticRenderer()
    const [scope, animate] = useAnimate()

    // Shuffled per-letter indices for the "random" stagger variant.
    const shuffledIndices = useMemo(() => {
        if (staggerFrom !== "random") return null
        const len = label ? label.length : 0
        const indices = Array.from({ length: len }, (_, i) => i)
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[indices[i], indices[j]] = [indices[j], indices[i]]
        }
        return indices
    }, [label, staggerFrom])

    // Transition with spring configuration.
    const transition = useMemo(() => {
        return (
            props.transition ??
            { type: "spring", duration: 0.7, bounce: 0.2 }
        )
    }, [props.transition])

    const mergeStagger = (base) => {
        if (staggerFrom === "random" && shuffledIndices) {
            const indices = shuffledIndices
            return {
                ...base,
                delay: (i) => staggerSec * (indices[i] ?? 0),
            }
        }
        return {
            ...base,
            delay: stagger(staggerSec, { from: staggerFrom }),
        }
    }

    // Debounced hover handlers
    const debouncedHoverStartRef = useRef(null)
    const debouncedHoverEndRef = useRef(null)
    const timerRefs = useRef({
        startTimer: null,
        startTrailing: false,
        endTimer: null,
        endTrailing: false,
    })

    useEffect(() => {
        if (isStatic) return

        const runStart = () => {
            animate(
                ".letter",
                { fontVariationSettings: toSettings },
                mergeStagger(transition)
            )
        }

        const runEnd = () => {
            animate(
                ".letter",
                { fontVariationSettings: fromSettings },
                mergeStagger(transition)
            )
        }

        const wait = 100
        const t = timerRefs.current

        debouncedHoverStartRef.current = () => {
            if (!t.startTimer) {
                runStart()
                t.startTimer = setTimeout(() => {
                    if (t.startTrailing) runStart()
                    t.startTrailing = false
                    t.startTimer = null
                }, wait)
            } else {
                t.startTrailing = true
            }
        }

        debouncedHoverEndRef.current = () => {
            if (!t.endTimer) {
                runEnd()
                t.endTimer = setTimeout(() => {
                    if (t.endTrailing) runEnd()
                    t.endTrailing = false
                    t.endTimer = null
                }, wait)
            } else {
                t.endTrailing = true
            }
        }

        return () => {
            if (t.startTimer) clearTimeout(t.startTimer)
            if (t.endTimer) clearTimeout(t.endTimer)
            t.startTimer = null
            t.endTimer = null
            t.startTrailing = false
            t.endTrailing = false
        }
    }, [
        isStatic,
        fromSettings,
        toSettings,
        staggerSec,
        staggerFrom,
        shuffledIndices,
        transition,
        animate,
    ])

    const handleHoverStart = () => debouncedHoverStartRef.current?.()
    const handleHoverEnd = () => debouncedHoverEndRef.current?.()

    const srOnlyStyle = {
        position: "absolute",
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clip: "rect(0,0,0,0)",
        whiteSpace: "nowrap",
        borderWidth: 0,
    }

    const innerSpanStyle = {
        fontFamily: VARIABLE_FONT_STACK,
        color,
        fontWeight: "inherit",
        ...(fontSize ? { fontSize } : {}),
    }

    const words = label ? label.split(" ") : []

    const interactive = !isStatic
    const handlers = !interactive
        ? {}
        : {
              onMouseEnter: handleHoverStart,
              onMouseLeave: handleHoverEnd,
              onClick,
          }

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                cursor: interactive
                    ? onClick
                        ? "pointer"
                        : "default"
                    : undefined,
                ...style,
            }}
            {...handlers}
        >
            <style dangerouslySetInnerHTML={{ __html: INTER_VARIABLE_FONT_FACE }} />
            {words.length === 0 ? null : (
                <span ref={scope} className={className} style={innerSpanStyle}>
                    <span style={srOnlyStyle}>{label}</span>
                    {words.map((word, wordIdx) => (
                        <span key={wordIdx} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                            {word.split("").map((letter, letterIdx) => (
                                <motion.span
                                    key={letterIdx}
                                    className="letter"
                                    aria-hidden
                                    style={{
                                        display: "inline-block",
                                        whiteSpace: "pre",
                                        fontVariationSettings: fromSettings,
                                    }}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                            {wordIdx < words.length - 1 && (
                                <span style={{ display: "inline-block", whiteSpace: "pre" }}> </span>
                            )}
                        </span>
                    ))}
                </span>
            )}
        </div>
    )
}

const INTER_VARIABLE_FONT_FACE = `
@font-face {
    font-family: "InterVariableFramer";
    src: url("https://rsms.me/inter/font-files/InterVariable.woff2?v=4.0") format("woff2-variations");
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
}
@font-face {
    font-family: "InterVariableFramer";
    src: url("https://rsms.me/inter/font-files/InterVariable-Italic.woff2?v=4.0") format("woff2-variations");
    font-weight: 100 900;
    font-style: italic;
    font-display: swap;
}
`

const VARIABLE_FONT_STACK =
    '"InterVariableFramer", "Inter Variable", "Inter", system-ui, sans-serif'

const COMPONENT_DEFAULTS = {
    label: "WEIGHT HOVER",
    fromWeight: 400,
    toWeight: 900,
    fontSize: null,
    color: "#FFFFFF",
    staggerDuration: 30,
    staggerFrom: "random",
    transition: {
        type: "spring",
        duration: 0.7,
        bounce: 0.2,
    },
}
