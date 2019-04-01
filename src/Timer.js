import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

const startRemainingSeconds = 720

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 170px;
    font-weight: bold;
    width: 100%;
    color: white;
    background-color: ${props => props.flash ? 'red' : 'magenta'};
`

const TimePart = styled.div`
    padding: 20px;
`

const Timer = () => {
    const [remainingSecs, setRemainingSecs] = useState(startRemainingSeconds)

    useEventListener('touchstart', (ev) => {
        if (remainingSecs <= 0)
            setRemainingSecs(startRemainingSeconds)
    })


    useEffect(() => {
        const decreaseTimer = (value) => {
            setRemainingSecs(prev => {
                const secs = (prev - value) < 0 ? 0 : prev - value
                return secs
            })
        }

        const id = setInterval(() => decreaseTimer(1), 1000)
        return () => {
            clearInterval(id)
        }
    }, [])

    const getMinutes = (seconds) => {
        return Math.floor(seconds / 60)
    }

    const getSeconds = (seconds) => {
        return seconds % 60
    }

    function useEventListener(eventName, handler, element = global) {
        // Create a ref that stores handler
        const savedHandler = useRef();

        // Update ref.current value if handler changes.
        // This allows our effect below to always get latest handler ...
        // ... without us needing to pass it in effect deps array ...
        // ... and potentially cause effect to re-run every render.
        useEffect(() => {
            savedHandler.current = handler;
        }, [handler]);

        useEffect(
            () => {
                // Make sure element supports addEventListener
                const isSupported = element && element.addEventListener;
                if (!isSupported) return;

                // Create event listener that calls handler function stored in ref
                const eventListener = event => savedHandler.current(event);

                // Add event listener
                element.addEventListener(eventName, eventListener);

                // Remove event listener on cleanup
                return () => {
                    element.removeEventListener(eventName, eventListener);
                };
            },
            [eventName, element] // Re-run if eventName or element changes
        );
    };


    return (
        <Container flash={remainingSecs === 0}>
            <TimePart>
                <div>{getMinutes(remainingSecs).toString().padStart(2, '0')}</div>
            </TimePart>
            <div>&nbsp;:&nbsp;</div>
            <TimePart>
                <div>{getSeconds(remainingSecs).toString().padStart(2, '0')}</div>
            </TimePart>
        </Container>
    )
}

function useEventListener(eventName, handler, element = global) {
    // Create a ref that stores handler
    const savedHandler = useRef();

    // Update ref.current value if handler changes.
    // This allows our effect below to always get latest handler ...
    // ... without us needing to pass it in effect deps array ...
    // ... and potentially cause effect to re-run every render.
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(
        () => {
            // Make sure element supports addEventListener
            const isSupported = element && element.addEventListener;
            if (!isSupported) return;

            // Create event listener that calls handler function stored in ref
            const eventListener = event => savedHandler.current(event);

            // Add event listener
            element.addEventListener(eventName, eventListener);

            // Remove event listener on cleanup
            return () => {
                element.removeEventListener(eventName, eventListener);
            };
        },
        [eventName, element] // Re-run if eventName or element changes
    );
};


export default Timer;