import { allExperiences } from "contentlayer/generated"
import { DataTable } from "./data-table"
import { columns } from "./columns"

export default async function ExperiencesPage() {
    // Sort experiences by endDate, then by startDate
    const sortedExperiences = allExperiences.sort((a, b) => {
        // Compare endDate first
        const endDateA = a.endDate ? new Date(a.endDate) : new Date(); // Treat "Present" as the current date
        const endDateB = b.endDate ? new Date(b.endDate) : new Date();

        if (endDateA < endDateB) return 1; // a comes before b
        if (endDateA > endDateB) return -1;  // b comes before a

        // If end dates are the same, compare startDate
        const startDateA = new Date(a.startDate);
        const startDateB = new Date(b.startDate);

        return startDateA < startDateB ? -1 : 1; // Older start date comes first
    });

    return (
    <div className="mx-auto py-10">
        <DataTable columns={columns} data={sortedExperiences} />
    </div>
    )
}
