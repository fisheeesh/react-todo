/* eslint-disable react/prop-types */
export default function ClearCompletedBtn({clearCompleted}) {
    return (
        <div>
            <button className="button" onClick={clearCompleted}>Clear completed</button>
        </div>
    )
}
