import { Employee } from '@/types/employee';
import { useQuery } from '@tanstack/react-query';
import { employeesApi } from '../api/employeesApi';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface EmployeeCardProps {
    employee: Employee;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
    const { data: reports } = useQuery({
        queryKey: ['employeeReports', employee.id],
        queryFn: () => employeesApi.getEmployeeReports(employee.id)
    });

    const handleDownload = (reportId: string) => {
        employeesApi.downloadReport(reportId);
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                    <AvatarImage src={employee.imageUrl} />
                    <AvatarFallback>{employee.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="font-semibold">{employee.name}</h3>
                    <p className="text-sm text-gray-500">{employee.position}</p>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-600">{employee.department}</p>
                <p className="text-sm text-gray-600">{employee.email}</p>
            </CardContent>
            <CardFooter>
                {reports?.map(report => (
                    <Button
                        key={report.id}
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(report.id)}
                    >
                        {report.period} Report
                    </Button>
                ))}
            </CardFooter>
        </Card>
    );
};