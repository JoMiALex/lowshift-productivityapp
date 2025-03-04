import { FormLogIn } from "@/app/login/page"
import TimeLog  from "@/app/time_log/TL"
import SchedulePage from "./schedule/page"
import  Checklist from "./Checklist/checklistScript"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/*<FormLogIn /> John Michael Test Page */}
      {<TimeLog />}
      {/* <SchedulePage /> */}
      {/* <Checklist /> */}
    </main>
  )
}
