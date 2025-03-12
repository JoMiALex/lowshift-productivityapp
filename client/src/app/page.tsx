import { FormLogIn } from "@/app/login/page"
import TimeLog  from "@/app/time_log/page"
import SchedulePage from "./schedule/page"
import Checklist from "./Checklist/page"
import TimeClock from "./timeclock/page"

export default function Home() {
  return (
    <main className="min-h-screen">
      <FormLogIn />
    </main>
  )
}

    {/*<FormLogIn /> John Michael Test Page */}
    {/* <TimeLog /> */}
    {/* <SchedulePage /> */}
    {/* <Checklist /> */}