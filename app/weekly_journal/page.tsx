import { allJournalEntries } from "@/.contentlayer/generated";
import { DataTable } from "./data-table"
import { columns } from "./columns"

export default async function WeeklyJournalPage() {
    // Sort experiences by endDate, then by startDate
    const sortedJournalEntries = allJournalEntries.sort((a, b) => {
        return a.date > b.date ? -1 : 1; // earlier start date comes first
    });

    return (
    <div className="mx-auto py-10">
        <DataTable columns={columns} data={sortedJournalEntries} />
    </div>
    )
}
