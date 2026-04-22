// import { DOCUMENT, CommonModule } from '@angular/common';
// import { CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, inject, OnDestroy, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ApiService } from 'src/app/@theme/services/api.service';
// import { AuthService } from '../../../auth/service/auth.service';
// import { Meta } from '@angular/platform-browser';

// const styles: string[] = [

// ];

// const scripts: string[] = [
//   'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4',
// ];

// @Component({
//   selector: 'app-advance',
//   templateUrl: './advance.component.html',
//   styleUrl: './advance.component.scss',
//   standalone: true,
//   imports: [CommonModule],
//   schemas: [CUSTOM_ELEMENTS_SCHEMA],
// })
// export class AdvanceComponent implements OnInit, OnDestroy, AfterViewInit {

//   private document = inject(DOCUMENT);
//   private renderer = inject(Renderer2);
//   private addedScripts: HTMLScriptElement[] = [];
//   private cdr = inject(ChangeDetectorRef);
//   showMore = false;
//   @ViewChild('preloader') preloader!: ElementRef;

//   imagesLoop: string[] = [];


//   isFlipped = false;
//   isHovered = false;

//   private autoFlipInterval: any;

//   showTutorial = false;

//   constructor() {

//   }

//   ngOnInit(): void {
//     scripts.forEach((url) => {
//       const script = this.renderer.createElement('script');
//       script.src = url;
//       script.async = true;
//       script.defer = true;
//       this.addedScripts.push(script);
//       this.renderer.appendChild(this.document.body, script);
//     });
//     this.imagesLoop = [...this.images, ...this.images];
//     this.startAutoFlip();

//   }



//   ngOnDestroy(): void {
//     this.stopAutoFlip();

//   }

//   ngAfterViewInit(): void {
//     this.computeSlides();

//     // 👇 deferimos la primera actualización para evitar NG0100
//     setTimeout(() => {
//       this.updateIndicator(this.containerRef.nativeElement.scrollLeft);
//       this.runPreloader();

//     });


//   }


//   runPreloader() {
//     setTimeout(() => {
//       this.renderer.addClass(this.preloader.nativeElement, 'loaded');
//     }, 1000);

//     setTimeout(() => {
//       this.showTutorial = true;
//     }, 3000);
//   }

//   closeTutorial() {
//     this.showTutorial = false;
//   }


//   // ──────────────── ViewChild / ViewChildren ────────────────
//   @ViewChild('toggleButton') toggleButton!: ElementRef;
//   @ViewChild('titleElement') titleElement!: ElementRef;
//   @ViewChild('navElement') navElement!: ElementRef;
//   // @ViewChild('containerRef', { static: true }) containerRef!: ElementRef;

//   // ──────────────── Estados públicos ────────────────
//   galeryOpen: boolean = false;
//   showPanel: boolean = false;
//   openedIndex: number | null = null;
//   currentSliderIndex = 0;

//   // ──────────────── Mock de datos ────────────────
//   sedes = [
//     { nombre: 'Sede Central', ubicacion: 'Bogotá, Colombia' },
//     { nombre: 'Sucursal Norte', ubicacion: 'Medellín, Colombia' },
//     { nombre: 'Sucursal Occidente', ubicacion: 'Cali, Colombia' },
//     { nombre: 'Sucursal Caribe', ubicacion: 'Barranquilla, Colombia' }
//   ];

//   aliados = [
//     {
//       nombre: 'Isabela Torres',
//       cargo: 'Directora de Estrategia Digital',
//       empresa: 'NovaSync Technologies',
//       pais: 'USA',
//       imagen: '../../../../../../assets/template/img/aliados.png'
//     },
//     {
//       nombre: 'Carlos Méndez',
//       cargo: 'CTO',
//       empresa: 'TechVision Group',
//       pais: 'México',
//       imagen: '../../../../../../assets/template/img/aliados.png'
//     },
//     {
//       nombre: 'Laura Gómez',
//       cargo: 'Gerente de Innovación',
//       empresa: 'Innovare Inc.',
//       pais: 'Colombia',
//       imagen: '../../../../../../assets/template/img/aliados.png'
//     },
//     {
//       nombre: 'Ana Silva',
//       cargo: 'Consultora Digital',
//       empresa: 'Global IT Solutions',
//       pais: 'Brasil',
//       imagen: '../../../../../../assets/template/img/aliados.png'
//     },
//     {
//       nombre: 'Isabela Torres',
//       cargo: 'Directora de Estrategia Digital',
//       empresa: 'NovaSync Technologies',
//       pais: 'USA',
//       imagen: '../../../../../../assets/template/img/aliados.png'
//     },
//     {
//       nombre: 'Carlos Méndez',
//       cargo: 'CTO',
//       empresa: 'TechVision Group',
//       pais: 'México',
//       imagen: '../../../../../../assets/template/img/aliados.png'
//     },
//     {
//       nombre: 'Laura Gómez',
//       cargo: 'Gerente de Innovación',
//       empresa: 'Innovare Inc.',
//       pais: 'Colombia',
//       imagen: '../../../../../../assets/template/img/aliados.png'
//     },
//     {
//       nombre: 'Ana Silva',
//       cargo: 'Consultora Digital',
//       empresa: 'Global IT Solutions',
//       pais: 'Brasil',
//       imagen: '../../../../../../assets/template/img/aliados.png'
//     }
//   ];

//   socialIcons = [
//     {
//       name: 'Facebook',
//       link: 'https://www.facebook.com/tuPagina',
//       icon: 'facebook'
//     },
//     {
//       name: 'Instagram',
//       link: 'https://www.instagram.com/tuPerfil',
//       icon: 'instagram'
//     },
//     {
//       name: 'LinkedIn',
//       link: 'https://www.linkedin.com/in/tuPerfil',
//       icon: 'linkedIn'
//     },
//     {
//       name: 'X (Twitter)',
//       link: 'https://twitter.com/tuUsuario',
//       icon: 'x'
//     },
//     {
//       name: 'YouTube',
//       link: 'https://www.youtube.com/tuCanal',
//       icon: 'youtube'
//     }
//   ];

//   items = [
//     {
//       title: 'Sección 1',
//       content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...'
//     },
//     {
//       title: 'Sección 2',
//       content: 'Contenido de la sección 2'
//     },
//     {
//       title: 'Sección 3',
//       content: 'Contenido de la sección 3'
//     }
//   ];


//   services = [
//     {
//       title: 'Sección 1',
//       content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
//       button: 'true',
//       type: 'payment', //payment or contact
//       linkType: '657',
//       link: 'data'


//     },
//     {
//       title: 'Sección 2',
//       content: 'Contenido de la sección 2',
//       button: 'true',
//       type: 'payment', //payment or contact
//       linkType: '657',
//       link: 'data'
//     },
//     {
//       title: 'Sección 3',
//       content: 'Contenido de la sección 3',
//       button: 'true',
//       type: 'payment', //payment or contact
//       linkType: '657',
//       link: 'data'
//     }
//   ];

//   images = [
//     "../../../../../../assets/template/img/galeria/1.jpg",
//     "../../../../../../assets/template/img/galeria/2.jpg",
//     "../../../../../../assets/template/img/galeria/3.jpg",
//     "../../../../../../assets/template/img/galeria/4.jpg",
//     "../../../../../../assets/template/img/galeria/5.jpg",
//     "../../../../../../assets/template/img/galeria/1.jpg",
//     "../../../../../../assets/template/img/galeria/2.jpg",
//     "../../../../../../assets/template/img/galeria/3.jpg",
//     "../../../../../../assets/template/img/galeria/4.jpg",
//     "../../../../../../assets/template/img/galeria/5.jpg",
//     "../../../../../../assets/template/img/galeria/1.jpg",
//     "../../../../../../assets/template/img/galeria/2.jpg",
//     "../../../../../../assets/template/img/galeria/3.jpg",
//     "../../../../../../assets/template/img/galeria/4.jpg",
//     "../../../../../../assets/template/img/galeria/5.jpg"
//   ];


//   payments = [
//     "../../../../../../assets/template/img/payments/pay.png",
//     "../../../../../../assets/template/img/payments/stripe.png",
//     "../../../../../../assets/template/img/payments/paypal.png",
//     "../../../../../../assets/template/img/payments/google_pay.png",
//     "../../../../../../assets/template/img/payments/pay.png",
//     "../../../../../../assets/template/img/payments/stripe.png",
//     "../../../../../../assets/template/img/payments/paypal.png",
//     "../../../../../../assets/template/img/payments/google_pay.png"
//   ];

//   togglePanel(active?: any): void {
//     this.showPanel = !this.showPanel;
//   }


//   @ViewChild('containerRef', { static: true })
//   containerRef!: ElementRef<HTMLElement>;

//   totalSlides = 1;

//   indicatorWidth = 0;  // ancho en %
//   indicatorLeft = 0;   // posición en %
//   currentIndex = 0;    // slide actual




//   @HostListener('window:resize')
//   onResize() {
//     this.updateIndicator(this.containerRef.nativeElement.scrollLeft);
//   }

//   private computeSlides() {
//     const container = this.containerRef.nativeElement;

//     // cuenta solo los hijos que son "slides"
//     this.totalSlides =
//       Array.from(container.children).filter((el) =>
//         (el as HTMLElement).classList.contains('shrink-0')
//       ).length || 1;

//     // ancho proporcional de la barra (sin contar el primer slider)
//     this.indicatorWidth = 100 / (this.totalSlides - 1);


//   }

//   onContainerScroll(evt: Event) {
//     const el = evt.target as HTMLElement;
//     this.updateIndicator(el.scrollLeft);
//   }

//   private updateIndicator(scrollLeft: number) {
//     const container = this.containerRef.nativeElement;
//     const vw = container.clientWidth;

//     // índice actual del slide
//     const idx = Math.round(scrollLeft / vw);
//     this.currentIndex = Math.max(0, Math.min(this.totalSlides - 1, idx));

//     if (this.currentIndex === 0) {
//       // primer slider → header oculto
//       this.indicatorLeft = 0;
//       return;
//     }

//     // sliders secundarios
//     const relativeIndex = this.currentIndex - 1;
//     const secondarySlides = this.totalSlides - 1;

//     this.indicatorWidth = 100 / secondarySlides;
//     this.indicatorLeft = relativeIndex * this.indicatorWidth;
//   }

//   // ──────────────── Propiedades privadas ────────────────
//   // private renderer = inject(Renderer2);
//   private sectionStates: {
//     [id: string]: { visible: boolean; translateClass: string };
//   } = {};

//   // constructor() { }

//   // ──────────────── Métodos públicos ────────────────

//   toggleGalery(): void {
//     this.galeryOpen = !this.galeryOpen;

//     if (this.showPanel === true) {
//       this.showPanel = false;
//     }

//   }


//   onToggle(): void {
//     this.toggleClass(this.toggleButton.nativeElement, 'active');
//     this.toggleClass(this.titleElement.nativeElement, 'active');
//     this.toggleClass(this.navElement.nativeElement, 'active');
//   }

//   toggleAccordion(index: number): void {
//     this.openedIndex = this.openedIndex === index ? null : index;
//   }

//   goToSlide(index: number): void {
//     this.showPanel = false;
//     const container = this.containerRef.nativeElement;
//     const containerWidth = container.offsetWidth;
//     const scrollPosition = index * containerWidth;
//     container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
//   }

//   // ──────────────── Métodos privados ────────────────

//   private toggleClass(element: HTMLElement, className: string): void {
//     if (element.classList.contains(className)) {
//       this.renderer.removeClass(element, className);
//     } else {
//       this.renderer.addClass(element, className);
//     }
//   }


//   activeTab = 0;

//   setActiveTab(index: number) {
//     this.activeTab = index;
//   }




//   toggleFlip(): void {
//     this.isFlipped = !this.isFlipped;
//   }

//   onMouseEnter(): void {
//     this.isHovered = true;
//     this.stopAutoFlip();
//   }

//   onMouseLeave(): void {
//     this.isHovered = false;
//     this.startAutoFlip();
//   }

//   startAutoFlip(): void {
//     this.stopAutoFlip();

//     this.autoFlipInterval = setInterval(() => {
//       if (!this.isHovered) {
//         this.isFlipped = !this.isFlipped;
//       }
//     }, 6000);
//   }

//   stopAutoFlip(): void {
//     if (this.autoFlipInterval) {
//       clearInterval(this.autoFlipInterval);
//       this.autoFlipInterval = null;
//     }
//   }

//   @ViewChild('track', { static: true })
//   track!: ElementRef<HTMLDivElement>;

//   private isDragging = false;
//   private startX = 0;
//   private currentOffset = 0;

//   onMouseDown(event: MouseEvent) {
//     this.isDragging = true;
//     this.startX = event.clientX;
//     this.track.nativeElement.classList.add('dragging');
//   }

//   onMouseMove(event: MouseEvent) {
//     if (!this.isDragging) return;

//     const delta = event.clientX - this.startX;
//     const newOffset = this.currentOffset + delta;

//     this.track.nativeElement.style.setProperty(
//       '--drag-offset',
//       `${newOffset}px`
//     );
//   }

//   onMouseUp() {
//     if (!this.isDragging) return;

//     this.isDragging = false;
//     this.track.nativeElement.classList.remove('dragging');

//     // Guardamos el offset final para el siguiente drag
//     const value = getComputedStyle(this.track.nativeElement)
//       .getPropertyValue('--drag-offset');

//     this.currentOffset = parseFloat(value) || 0;
//   }


//   showSaveOptions = false;

//   toggleSaveOptions() {
//     this.showSaveOptions = !this.showSaveOptions;
//   }

//   saveDraft() {
//     console.log('Guardar borrador');
//     this.showSaveOptions = false;
//   }

//   saveAndPublish() {
//     console.log('Guardar y publicar');
//     this.showSaveOptions = false;
//   }



// }
