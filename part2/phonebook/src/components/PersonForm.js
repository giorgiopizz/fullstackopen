import React from "react";


const PersonForm = ({ handSumbit, valName, handName, valNum, handNumber }) => {
    return (
        <form onSubmit={handSumbit}>
            <div>
                name: <input value={valName} onChange={handName} />
                <br />
        number: <input value={valNum} onChange={handNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};

export default PersonForm;
