import { useSelector } from "react-redux"
import { StateSchema } from "../../app/providers/store"
import "./InfoPage.css"

export default function InfoPage() {
  const logs = useSelector(
    (state: StateSchema) => state.log.logs
  )
  
  return (
    <div className="info container">
      {logs.map(val =>
        <p>{val}</p>
      )}
    </div>
  )
}
