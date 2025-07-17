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

    const initializeGrid = useCallback(() => {
        const totalItem: number = size * size;
        const pairItem: number = Math.floor(totalItem / 2)
        const array = Array.from({ length: pairItem }, (_, index) => index + 1);
        const suffledArray: GridItem[] = [...array, ...array]
            .sort(() => Math.random() - 0.5)
            .slice(0, totalItem)
            .map((value, id) => ({ id, value}));

        setGrid(suffledArray);
        setIsWon(false);
        setDisabledCard(false)
        setFlippedCard([]);
        setPairCard([]);
    }, [size])

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
                const copyPairCards = [...new Set([...pairCard, firstId, itemId])]
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
    }, [initializeGrid])

    const isFlippedCard = useCallback(
        (val: number): boolean => flippedCard.includes(val),
        [flippedCard]
    );

    const isPairMatched = useCallback(
        (val: number): boolean => pairCard.includes(val),
        [pairCard]
    );

    return (
        <div className='gamWrapper'>
            <div className='ReactMemoryGameComponent' style={{
                marginTop: "1rem", display: "grid", gap: "4px", gridTemplateColumns: `repeat(${size}, 1fr)`
            }}>
                {grid?.map((item) => (
                    <Grid
                        key={item.id}
                        item={item}
                        handleCardClick={handleCardClick}
                        isFlippedCard={isFlippedCard(item.id)}
                        isPairMatched={isPairMatched(item.id)}
                    />
                ))}
            </div>

            {isWon && <h1>You Won the Game</h1>}
            <button onClick={reset} style={{ padding: "5px 3rem", cursor: "pointer", marginTop: "1rem" }}>{isWon ? "Play Again!" : "Reset"}</button>
        </div>
    )
}

export default ReactMemoryGameComponent