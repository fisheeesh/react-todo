// eslint-disable-next-line react/prop-types
export default function CheckAllAndRemaining({ remainingTodos, checkAllTodos }) {
    return (
        <div className="check-all-container">
            <div>
                <div onClick={checkAllTodos} className="button">Check All</div>
            </div>

            <span>{remainingTodos} item{remainingTodos > 1 ? 's' : ''} remaining</span>
        </div>
    )
}
