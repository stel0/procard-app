from colas import *
from datetime import datetime,timedelta
NOMBRE = ["Documento1", "Documento2", "Documento3", "Documento4"]
PAGINAS = [5, 5, 5, 5]
CPS1 = 3  # segundos de impresión por hoja
CPS2= 2
hora_inicio = datetime.now().replace(hour=8, minute=0, second=0)

nombre = Cola()
paginas = Cola()

for doc in NOMBRE:
    nombre.agregar(doc)

for pag in PAGINAS:
    paginas.agregar(pag)

tiempo_actual = datetime.now()
hora_inicio = tiempo_actual.replace(hour=8, minute=0, second=0)#hora de inicio de la impresion

segundos_aumentar=0
minutos_aumentar = 0
horas_aumentar = 0
cs=0
cs2=0
print("Hora de inicio de impresión:", hora_inicio)#se imprime la hora de inicio

impresoras = {"IMP1": True, "IMP2": True}

while not nombre.esta_vacia():
    print("Imprimiendo:",nombre.sacar())#se va imprimiendo el nombre del doc
    if impresoras["IMP1"]:
        segundos_aumentar += paginas.sacar()*CPS1 #se calcula los segundos *cps1
        cs=segundos_aumentar
        impresoras["IMP1"] = False
        impresora_actual = "IMP1"
        print("Impresora actual: ",impresora_actual)
    elif impresoras["IMP2"]:
        segundos_aumentar+=paginas.sacar()*CPS2
        cs2=segundos_aumentar
        impresoras["IMP2"]=False
        impresora_actual = "IMP2"
        print("Impresora actual: ",impresora_actual)
    while segundos_aumentar>=60:
        minutos_aumentar +=1
        segundos_aumentar-=60
        if minutos_aumentar>=60:
            horas_aumentar += 1
            minutos_aumentar-=60
    nuevo_tiempo = hora_inicio + timedelta(seconds=segundos_aumentar, minutes=minutos_aumentar,hours=horas_aumentar)
    print(nuevo_tiempo)
    if cs>cs2:
        impresoras["IMP2"]=True
    else:
        impresoras["IMP1"]=True
nuevo_tiempo = hora_inicio + timedelta(seconds=segundos_aumentar, minutes=minutos_aumentar,hours=horas_aumentar)

print("Tiempo final:",nuevo_tiempo)