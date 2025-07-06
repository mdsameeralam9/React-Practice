import React from 'react'
import { Outlet, Link } from 'react-router-dom';

const problemsType = [{ id: 1, to: "/nestedcheckbox", label: 'Problem Type 1' }, { id: 2, to: "/nestedcheckbox/type2", label: 'Problem Type 2' },]

const CheckBoxLayout = () => {
    return (
        <div>
            <h1>Nested CheckBox cover all Types of Problem</h1>
            {problemsType.map(item => (
                <Link key={item.id} to={`${item.to}`}>
                    {item.label}
                </Link>
            ))}
            <Outlet />
        </div>
    )
}

export default CheckBoxLayout