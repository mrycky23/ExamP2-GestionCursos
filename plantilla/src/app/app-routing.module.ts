// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';

const routes: Routes = [
  {
    path: '', //url
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/default/dashboard/dashboard.component').then((c) => c.DefaultComponent),
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/ui-component/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/ui-component/ui-color/ui-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      },
      {
        path: 'proveedores',
        loadComponent: () => import('./proveedores/proveedores.component').then((m) => m.ProveedoresComponent),
      },
      {
        path: 'nuevoproveedor',
        loadComponent: () => import('./proveedores/nuevoproveedor/nuevoproveedor.component').then((m) => m.NuevoproveedorComponent),
      },
      {
        path: 'editarproveedor/:id',
        loadComponent: () => import('./proveedores/nuevoproveedor/nuevoproveedor.component').then((m) => m.NuevoproveedorComponent),
      },
      {
        path: 'curso',
        loadComponent: () => import('./cursos/cursos.component').then((m) => m.CursosComponent),
      },
      {
        path: 'nuevocurso',
        loadComponent: () => import('./cursos/nuevocurso/nuevocurso.component').then((m) => m.NuevoclienteComponent),
      },
      {
        path: 'editarcurso/:idCurso',
        loadComponent: () => import('./cursos/nuevocurso/nuevocurso.component').then((m) => m.NuevoclienteComponent),
      },
      {
        path: 'editarinscripcion/:id',
        loadComponent: () => import('./inscripciones/nuevainscripcion/nuevainscripcion.component').then((m) => m.NuevainscripcionComponent)
      },
      {
        path: 'nuevainscripcion',
        loadComponent: () => import('./inscripciones/nuevainscripcion/nuevainscripcion.component').then((m) => m.NuevainscripcionComponent),
      },
      {
        path: 'inscripciones',
        loadComponent: () => import('./inscripciones/inscripciones.component').then((m) => m.InscripcionesComponent)
      },
      {
        path: 'estudiantes',
        loadComponent: () => import('./estudiantes/estudiantes.component').then((m) => m.EstudiantesComponent),
      },
      {
        path: 'nuevoestudiante',
        loadComponent: () =>
          import('./estudiantes/nuevoestudiante/nuevoestudiante.component').then((m) => m.NuevoEstudianteComponent),
      },
      {
        path: 'editarestudiante/:idUnidad_Medida',
        loadComponent: () =>
          import('./unidadmedida/nuevaunidadmedida/nuevaunidadmedida.component').then((m) => m.NuevaunidadmedidaComponent),
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
