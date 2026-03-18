"use client";

import AppLayout from "@/@pv/components/layouts/AppLayout";
import TableCustomized from "@/@pv/components/table";
import { useFilter } from "@/@pv/hooks/use-filter";

function TablePage() {
    const { filterAppliedCount } = useFilter(["is_admin", "is_superuser"]);

    return (
        <AppLayout title="Table Page">
            <TableCustomized
                rows={[]}
                columns={[]}
                rowCount={0}
                onSearch={() => { }}
                onExport={() => { }}
                onImport={() => { }}
                sortProps={{
                    show: true
                }}
                filterProps={{
                    appliedCount: filterAppliedCount,
                    autoShow: true,
                    filterItems: [
                        {
                            label: "Superuser",
                            type: "boolean",
                            valueKey: "is_superuser"
                        },
                        {
                            label: "Admin",
                            type: "option",
                            valueKey: "is_admin",
                            options: [
                                {
                                    label: "Admin Tenant",
                                    value: "admin_tenant"
                                },
                                {
                                    label: "Store Tenant",
                                    value: "store_tenant"
                                }
                            ]
                        }
                    ]
                }}
            />
        </AppLayout>
    )
}

export default TablePage;
