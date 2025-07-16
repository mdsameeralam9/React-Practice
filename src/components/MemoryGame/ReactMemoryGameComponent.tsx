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
    const [flippedCard, setFlippedCard] = useState<number[]>([]);
    const [pairCard, setPairCard] = useState<GridItem[]>([]);

    const initializeGrid = () => {
        const totalItem: number = size * size;
        const pairItem: number = Math.floor(totalItem / 2)
        const array = Array.from({ length: pairItem }, (_, index) => index + 1);
        const suffledArray: GridItem[] = [...array, ...array]
            .sort(() => Math.random() - 0.5)
            .slice(0, totalItem)
            .map((val, idx) => ({ id: idx, value: val }));

        setGrid(suffledArray)
    }
    const reset = () => initializeGrid();

    const handleCardClick = (data: GridItem): void => {
        if (isWon) return;
        console.log(data, flippedCard)
        const copy = [...flippedCard];
        if (copy.length === 0) {
            copy.push(data.id)
            setFlippedCard(copy);
        } else {

            // both value are equal the push both the value to winArr and make this array to []
            const filValue: GridItem | undefined = grid.find(i => i.id === copy[0]);
            console.log("43===>", filValue)
            if (data.value === filValue?.value) {
                const copyPairCards = [...pairCard]
                copyPairCards.push(filValue, data)
                setPairCard(copyPairCards);
                setFlippedCard([]);
                if (copyPairCards.length === grid.length) {
                    setIsWon(true)
                }
            } else {
                // make this array to empty after 1 second
                setTimeout(() => {
                    setFlippedCard([]);
                }, 1000)
            }
        }



    }

    useEffect(() => {
        initializeGrid()
    }, [size])


    console.log(pairCard)

    if (isWon) return <h1>You won the game</h1>

    return (
        <div className='gamWrapper'>
            <div className='ReactMemoryGameComponent' style={{ gridTemplateColumns: `repeat(${size} 1fr)` }}>
                {grid?.map((item) => (
                    <Grid
                        key={item.id}
                        item={item}
                        handleCardClick={handleCardClick}

                    />
                ))}
            </div>
            <button onClick={reset} style={{ padding: "5px 3rem", cursor: "pointer", marginTop: "1rem" }}>{isWon ? "Play Again!" : "Reset"}</button>
        </div>
    )
}

export default ReactMemoryGameComponent