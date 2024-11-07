import { Component } from '@angular/core';
import { PostService } from '../../core/services/post.service';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../core/services/category.service';
import { FormsModule } from '@angular/forms';  // Asegúrate de tener FormsModule

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export default class DashboardComponent {
  posts: any[] = [];
  categorias: any[] = [];
  postCount: number = 0;
  selectedCategory: number | null = null;
  postsFiltrados: any[] = [];
  categoriaBusqueda: string = '';

  constructor(
    private postAllService: PostService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.obtenerPosts();
    this.obtenerConteoDePosts();
    this.obtenerCategorias();
  }

  obtenerPosts(): void {
    this.postAllService.postsAll().subscribe({
      next: (response) => {
        this.posts = response;
        this.postsFiltrados = response;  // Inicializamos postsFiltrados con todos los posts
        this.filtrarPorCategoria();  // Aplicamos el filtro por categoría al cargar los datos
      },
      error: (error) => {
        console.error('Error al obtener los posts:', error);
      }
    });
  }

  obtenerConteoDePosts(): void {
    this.postAllService.countPost().subscribe({
      next: (count) => {
        this.postCount = count;
      },
      error: (error) => {
        console.error('Error al obtener el conteo de posts:', error);
      }
    });
  }

  obtenerCategorias(): void {
    this.categoryService.categoryAll().subscribe({
      next: (response) => {
        this.categorias = response;
      },
      error: (error) => {
        console.error('Error al obtener las categorías:', error);
      }
    });
  }

  filtrarPorCategoria(): void {
    console.log('Texto de búsqueda:', this.categoriaBusqueda);

    if (this.categoriaBusqueda.trim() !== '') {
      // Si hay texto en el campo de búsqueda, filtramos por nombre de categoría
      this.postsFiltrados = this.posts.filter(post =>
        post.category_name.toLowerCase().includes(this.categoriaBusqueda.toLowerCase())
      );
      console.log('Posts filtrados:', this.postsFiltrados);
    } else {
      // Si no hay texto en el campo de búsqueda, mostramos todos los posts
      this.postsFiltrados = this.posts;
    }
  }
}
