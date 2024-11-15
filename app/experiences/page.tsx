import { allExperiences } from "contentlayer/generated"
import { DataTable } from "./data-table"
import { columns } from "./columns"

export default async function ExperiencesPage() {
    // Sort experiences by endDate, then by startDate
    const sortedExperiences = allExperiences.sort((a, b) => {
        let aEndDate: Date;
        let bEndDate: Date;
        if (!a.endDate) {
            aEndDate = new Date();
        } else {
            const aEndYear = parseInt(a.endDate.split("/")[1]);
            const aEndMonth = parseInt(a.endDate.split("/")[0]);
            aEndDate = new Date(aEndYear, aEndMonth, 1);
        }
        if (!b.endDate) {
            bEndDate = new Date();
        } else {
            const bEndYear = parseInt(b.endDate.split("/")[1]);
            const bEndMonth = parseInt(b.endDate.split("/")[0]);
            bEndDate = new Date(bEndYear, bEndMonth, 1);
        }

        if (aEndDate < bEndDate) return 1; // a comes before b
        if (aEndDate > bEndDate) return -1;  // b comes before a

        // If end dates are the same, compare startDates
        const aStartYear = parseInt(a.startDate.split("/")[1]);
        const bStartYear = parseInt(b.startDate.split("/")[1]);

        const aStartMonth = parseInt(a.startDate.split("/")[0]);
        const bStartMonth = parseInt(b.startDate.split("/")[0]);

        const aStartDate = new Date(aStartYear, aStartMonth, 1);
        const bStartDate = new Date(bStartYear, bStartMonth, 1);

        return aStartDate > bStartDate ? -1 : 1; // earlier start date comes first
    });

    return (
    <div className="mx-auto py-10">
        <DataTable columns={columns} data={sortedExperiences} />
    </div>
    )
}
