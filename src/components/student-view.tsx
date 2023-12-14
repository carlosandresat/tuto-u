import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function StudentView() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  max-w-screen-2xl w-full">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="/photos/carlos.arevalo.jpg" />
              <AvatarFallback>CA</AvatarFallback>
            </Avatar>
            <CardTitle>Carlos Arévalo</CardTitle>
          </div>
          <CardDescription>Course: Mathematics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>Fecha: 20 Dic, 2023</p>
          <p>Hora: 2:00PM - 4:00PM</p>
          <p>Lugar: Room 101</p>
          <p>Tema: Differential Equations</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Badge className=" bg-green-500">Status: Aceptada</Badge>
          <Button>Calificar</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>ML</AvatarFallback>
            </Avatar>
            <CardTitle>Mary Lee</CardTitle>
          </div>
          <CardDescription>Course: Physics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>Date: 14 Ene, 2023</p>
          <p>Time: 10:00AM - 12:00PM</p>
          <p>Place: Lab 201</p>
          <p>Topic: Quantum Mechanics</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Badge className=" bg-yellow-500">Status: Pendiente</Badge>
          <Button>Cancelar</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>RD</AvatarFallback>
            </Avatar>
            <CardTitle>Robert Davis</CardTitle>
          </div>
          <CardDescription>Course: Chemistry</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>Date: 15 Ene, 2024</p>
          <p>Time: 3:00PM - 5:00PM</p>
          <p>Place: Room 101</p>
          <p>Topic: Organic Chemistry</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center gap-x-2">
          <Badge className=" bg-blue-500">Status: Cambios propuestos</Badge>
          <Button>Revisar</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <CardTitle>John Doe</CardTitle>
          </div>
          <CardDescription>Course: Chemistry</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>Date: 16 Ene, 2024</p>
          <p>Time: 3:00PM - 5:00PM</p>
          <p>Place: Lab 301</p>
          <p>Topic: Organic Chemistry</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Badge variant="destructive" className="flex h-full mt-2">Status: Cancelada</Badge>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="/photos/carlos.arevalo.jpg" />
              <AvatarFallback>CA</AvatarFallback>
            </Avatar>
            <CardTitle>Carlos Arévalo</CardTitle>
          </div>
          <CardDescription>Course: Chemistry</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>Date: 14 Feb, 2024</p>
          <p>Time: 3:00PM - 5:00PM</p>
          <p>Place: Lab 301</p>
          <p>Topic: Organic Chemistry</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center gap-x-2">
          <Badge className=" bg-green-500">Status: Aceptada</Badge>
          <Button>Cancelar</Button>
        </CardFooter>
      </Card>


    </div>
  )
}

