import React, { useState, useEffect, useCallback } from 'react'
import Grid from './Grid'

interface MemPropsInterface {
    size: number
}

export type GridItem = {
    id: number;
    value: number
}

const ReactMemoryGameComponent: React.FC<MemPropsInterface> = ({ size }) => {
    const [grid, setGrid] = useState<GridItem[]>([]);
    const [isWon, setIsWon] = useState<boolean>(false);
    const [disabledCard, setDisabledCard] = useState<boolean>(false);
    const [flippedCard, setFlippedCard] = useState<number[]>([]);
    const [pairCard, setPairCard] = useState<number[]>([]);

    const initializeGrid = () => {
        const totalItem: number = size * size;
        const pairItem: number = Math.floor(totalItem / 2)
        const array = Array.from({ length: pairItem }, (_, index) => index + 1);
        const suffledArray: GridItem[] = [...array, ...array]
            .sort(() => Math.random() - 0.5)
            .slice(0, totalItem)
            .map((val, idx) => ({ id: idx, value: val }));

        setGrid(suffledArray);
        setIsWon(false);
        setDisabledCard(false)
        setFlippedCard([]);
        setPairCard([]);
    }

    const reset = () => initializeGrid();

    const handleCardClick = (itemId: number): void => {
        if (isWon || disabledCard) return;
        const copy = [...flippedCard];
        if (copy.length === 0) {
            copy.push(itemId)
            setFlippedCard(copy);
        } else {
            setDisabledCard(true)
            const firstId = copy[0]
            copy.push(itemId)
            setFlippedCard(copy);
            if (grid[itemId]?.value === grid[firstId]?.value) {
                const copyPairCards = [...pairCard]
                copyPairCards.push(copy[0], itemId)
                setPairCard(copyPairCards);
                setDisabledCard(false);
                setFlippedCard([]);
                if (copyPairCards.length === grid.length) {
                    setIsWon(true)
                }
            } else {
                // make this array to empty after 1 second
                setTimeout(() => {
                    setDisabledCard(false)
                    setFlippedCard([]);
                }, 1000)
            }
        }
    }

    useEffect(() => {
        initializeGrid()
    }, [size])

    if (isWon) return (
        <>
            <h1>You Won the Game</h1>
            <button onClick={reset} style={{ padding: "5px 3rem", cursor: "pointer", marginTop: "1rem" }}>{isWon ? "Play Again!" : "Reset"}</button>
        </>
    )

    const isItmeIncluded = (val: number): boolean => (flippedCard.includes(val) || pairCard.includes(val))

    return (
        <div className='gamWrapper'>
            <div className='ReactMemoryGameComponent' style={{ gridTemplateColumns: `repeat(${size} 1fr)` }}>
                {grid?.map((item) => (
                    <Grid
                        key={item.id}
                        item={item}
                        handleCardClick={handleCardClick}
                        inIncluded={isItmeIncluded(item.id)}
                    />
                ))}
            </div>

        </div>
    )
}

export default ReactMemoryGameComponent