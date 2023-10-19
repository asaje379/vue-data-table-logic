import { DataModel } from './model';

export class AuthModel extends DataModel {
  entity: string = 'auth';
  columns = {
    username: "Nom d'utilisateur",
    email: 'Email',
    role: 'Role',
    status: 'Statut',
    createdAt: 'Inscrit le',
  };
}
