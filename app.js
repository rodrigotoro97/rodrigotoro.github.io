
// Finance Control App - JavaScript
class FinanceApp {
    constructor() {
        this.data = this.loadData();
        this.currentInvoiceFilter = 'todas';
        this.currentClient = null;
        this.currentInvoice = null;
        this.currentService = null;
        this.incomeChart = null;
        this.serviceChart = null;

        this.init();
    }

    // Initialize the app
    init() {
        this.renderDashboard();
        this.renderClients();
        this.renderInvoices();
        this.renderServices();
        this.setupEventListeners();
        this.initChart();
    }

    // Load data from localStorage or use default data
    loadData() {
        const savedData = localStorage.getItem('financeAppData');
        if (savedData) {
            return JSON.parse(savedData);
        }

        // Default data
        return {
            clientes: [
                {id: 1, nombre: "Juan Pérez", telefono: "+34 600 123 456", email: "juan@email.com", direccion: "Calle Principal 123", facturas: 5, totalFacturado: 4250},
                {id: 2, nombre: "María García", telefono: "+34 600 789 012", email: "maria@email.com", direccion: "Avenida Central 456", facturas: 3, totalFacturado: 2890},
                {id: 3, nombre: "Carlos López", telefono: "+34 600 345 678", email: "carlos@email.com", direccion: "Plaza Mayor 789", facturas: 7, totalFacturado: 6150},
                {id: 4, nombre: "Ana Martínez", telefono: "+34 600 901 234", email: "ana@email.com", direccion: "Calle Secundaria 321", facturas: 2, totalFacturado: 1750},
                {id: 5, nombre: "Pedro Rodríguez", telefono: "+34 600 567 890", email: "pedro@email.com", direccion: "Avenida Norte 654", facturas: 4, totalFacturado: 3450}
            ],
            facturas: [
                {id: "001", cliente: "Juan Pérez", monto: 1250, estado: "Pendiente", fecha: "2025-09-15", vencimiento: "2025-10-15", servicios: [{nombre: "Consultoría Web", cantidad: 8, precio: 150}], notas: "Desarrollo de sitio web corporativo"},
                {id: "002", cliente: "María García", monto: 890, estado: "Pagada", fecha: "2025-09-12", vencimiento: "2025-10-12", servicios: [{nombre: "Diseño Gráfico", cantidad: 12, precio: 75}], notas: "Material promocional"},
                {id: "003", cliente: "Carlos López", monto: 2150, estado: "Vencida", fecha: "2025-09-05", vencimiento: "2025-10-05", servicios: [{nombre: "Marketing Digital", cantidad: 2, precio: 800}, {nombre: "Auditoría SEO", cantidad: 1, precio: 500}], notas: "Campaña integral de marketing"},
                {id: "004", cliente: "Ana Martínez", monto: 750, estado: "Pagada", fecha: "2025-09-18", vencimiento: "2025-10-18", servicios: [{nombre: "Diseño Gráfico", cantidad: 10, precio: 75}], notas: "Rediseño de identidad visual"},
                {id: "005", cliente: "Pedro Rodríguez", monto: 1450, estado: "Pendiente", fecha: "2025-09-20", vencimiento: "2025-10-20", servicios: [{nombre: "Consultoría Web", cantidad: 8, precio: 150}, {nombre: "Mantenimiento Web", cantidad: 1, precio: 200}], notas: "Desarrollo y mantenimiento web"}
            ],
            servicios: [
                {id: 1, nombre: "Consultoría Web", precio: 150, unidad: "hora", descripcion: "Desarrollo y diseño web profesional", vecesVendido: 24, ingresosGenerados: 3600},
                {id: 2, nombre: "Marketing Digital", precio: 800, unidad: "mes", descripcion: "Gestión completa de redes sociales y campañas", vecesVendido: 8, ingresosGenerados: 6400},
                {id: 3, nombre: "Diseño Gráfico", precio: 75, unidad: "hora", descripcion: "Creación de material visual y branding", vecesVendido: 32, ingresosGenerados: 2400},
                {id: 4, nombre: "Auditoría SEO", precio: 500, unidad: "proyecto", descripcion: "Análisis completo y optimización SEO", vecesVendido: 12, ingresosGenerados: 6000},
                {id: 5, nombre: "Mantenimiento Web", precio: 200, unidad: "mes", descripcion: "Soporte técnico y actualizaciones continuas", vecesVendido: 15, ingresosGenerados: 3000}
            ],
            metricas: {
                ingresosMesActual: 45750,
                ingresosMesAnterior: 38200,
                facturasPendientes: 12,
                facturasPagadas: 28,
                facturasVencidas: 3,
                totalClientes: 25,
                totalFacturas: 43,
                serviciosActivos: 15
            },
            ingresosMensuales: [
                {mes: "Enero", valor: 32000},
                {mes: "Febrero", valor: 28500},
                {mes: "Marzo", valor: 41200},
                {mes: "Abril", valor: 38900},
                {mes: "Mayo", valor: 42100},
                {mes: "Junio", valor: 45750}
            ]
        };
    }

    // Save data to localStorage
    saveData() {
        localStorage.setItem('financeAppData', JSON.stringify(this.data));
    }

    // Setup event listeners
    setupEventListeners() {
        // Client search
        const clientSearch = document.getElementById('client-search');
        if (clientSearch) {
            clientSearch.addEventListener('input', (e) => {
                this.searchClients(e.target.value);
            });
        }

        // Form submissions
        document.getElementById('newClientForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addClient(new FormData(e.target));
        });

        document.getElementById('newInvoiceForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addInvoice(new FormData(e.target));
        });

        document.getElementById('newServiceForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addService(new FormData(e.target));
        });

        // Service input listeners for invoice calculation
        document.addEventListener('input', (e) => {
            if (e.target.matches('input[name*="cantidad"], input[name*="precio"]')) {
                this.calculateInvoiceTotal();
            }
        });

        // Service select change
        document.addEventListener('change', (e) => {
            if (e.target.matches('select[name*="servicios"]')) {
                this.updateServicePrice(e.target);
            }
        });
    }

    // Initialize Chart
    initChart() {
        const ctx = document.getElementById('incomeChart')?.getContext('2d');
        if (ctx) {
            if (this.incomeChart) {
                this.incomeChart.destroy();
            }

            this.incomeChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: this.data.ingresosMensuales.map(m => m.mes),
                    datasets: [{
                        label: 'Ingresos (€)',
                        data: this.data.ingresosMensuales.map(m => m.valor),
                        backgroundColor: '#2196F3',
                        borderColor: '#1976D2',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return '€' + value.toLocaleString();
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }
    }

    // Switch between tabs/screens
    switchTab(tabName) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show selected screen
        document.getElementById(tabName)?.classList.add('active');

        // Update navigation
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');

        // Update page title
        const titles = {
            dashboard: 'Control de Finanzas',
            clientes: 'Mis Clientes',
            facturas: 'Gestión de Facturas',
            servicios: 'Catálogo de Servicios',
            config: 'Configuración'
        };

        document.getElementById('page-title').textContent = titles[tabName] || 'Control de Finanzas';
    }

    // Show modal
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');

            // Populate client selector in new invoice modal
            if (modalId === 'newInvoiceModal') {
                this.populateClientSelector();
                this.populateServiceSelectors();
                this.setDefaultDates();
            }
        }
    }

    // Hide modal
    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            // Reset forms
            modal.querySelector('form')?.reset();
        }
    }

    // Render Dashboard
    renderDashboard() {
        // Update metrics are already in HTML with static data
        // In a real app, these would be calculated from actual data
        this.updateMetrics();
    }

    // Update metrics
    updateMetrics() {
        const facturasPendientes = this.data.facturas.filter(f => f.estado === 'Pendiente').length;
        const facturasPagadas = this.data.facturas.filter(f => f.estado === 'Pagada').length;
        const facturasVencidas = this.data.facturas.filter(f => f.estado === 'Vencida').length;

        // Update counters
        const allCount = this.data.facturas.length;
        document.getElementById('all-count').textContent = allCount;
        document.getElementById('paid-count').textContent = facturasPagadas;
        document.getElementById('pending-count').textContent = facturasPendientes;
        document.getElementById('overdue-count').textContent = facturasVencidas;

        document.getElementById('client-count').textContent = this.data.clientes.length;
        document.getElementById('service-count').textContent = this.data.servicios.length;
    }

    // Render Clients
    renderClients() {
        const clientList = document.getElementById('client-list');
        if (!clientList) return;

        clientList.innerHTML = this.data.clientes.map(client => `
            <div class="client-item" onclick="app.showClientProfile(${client.id})">
                <div class="client-name">${client.nombre}</div>
                <div class="client-info">${client.telefono} • ${client.email}</div>
                <div class="client-actions">
                    <span class="client-invoices">${client.facturas} facturas</span>
                    <button class="view-profile-btn" onclick="event.stopPropagation(); app.showClientProfile(${client.id})">
                        Ver Perfil
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Search clients
    searchClients(query) {
        const clientList = document.getElementById('client-list');
        if (!clientList) return;

        const filteredClients = this.data.clientes.filter(client => 
            client.nombre.toLowerCase().includes(query.toLowerCase()) ||
            client.email.toLowerCase().includes(query.toLowerCase()) ||
            client.telefono.includes(query)
        );

        clientList.innerHTML = filteredClients.map(client => `
            <div class="client-item" onclick="app.showClientProfile(${client.id})">
                <div class="client-name">${client.nombre}</div>
                <div class="client-info">${client.telefono} • ${client.email}</div>
                <div class="client-actions">
                    <span class="client-invoices">${client.facturas} facturas</span>
                    <button class="view-profile-btn" onclick="event.stopPropagation(); app.showClientProfile(${client.id})">
                        Ver Perfil
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Show client profile
    showClientProfile(clientId) {
        const client = this.data.clientes.find(c => c.id === clientId);
        if (!client) return;

        this.currentClient = client;

        document.getElementById('client-profile-name').textContent = client.nombre;
        document.getElementById('client-profile-phone').textContent = client.telefono;
        document.getElementById('client-profile-email').textContent = client.email;
        document.getElementById('client-profile-address').textContent = client.direccion;
        document.getElementById('client-profile-total').textContent = '€' + client.totalFacturado.toLocaleString();
        document.getElementById('client-profile-invoices').textContent = client.facturas;

        this.showModal('clientProfileModal');
    }

    // Add new client
    addClient(formData) {
        const newClient = {
            id: Math.max(...this.data.clientes.map(c => c.id), 0) + 1,
            nombre: formData.get('nombre'),
            telefono: formData.get('telefono'),
            email: formData.get('email'),
            direccion: formData.get('direccion') || '',
            facturas: 0,
            totalFacturado: 0
        };

        this.data.clientes.push(newClient);
        this.saveData();
        this.renderClients();
        this.updateMetrics();
        this.hideModal('newClientModal');

        this.showNotification('Cliente agregado exitosamente', 'success');
    }

    // Render Invoices
    renderInvoices() {
        const invoiceList = document.getElementById('invoice-list');
        if (!invoiceList) return;

        let filteredInvoices = this.data.facturas;

        if (this.currentInvoiceFilter !== 'todas') {
            filteredInvoices = this.data.facturas.filter(invoice => invoice.estado === this.currentInvoiceFilter);
        }

        invoiceList.innerHTML = filteredInvoices.map(invoice => `
            <div class="invoice-item" onclick="app.showInvoiceDetail('${invoice.id}')">
                <div class="invoice-header">
                    <div class="invoice-number">#${invoice.id}</div>
                    <div class="invoice-amount">€${invoice.monto.toLocaleString()}</div>
                </div>
                <div class="invoice-client">${invoice.cliente}</div>
                <div class="invoice-footer">
                    <div class="invoice-date">${this.formatDate(invoice.fecha)}</div>
                    <span class="status-badge ${invoice.estado}">${invoice.estado}</span>
                </div>
            </div>
        `).join('');
    }

    // Filter invoices
    filterInvoices(filter) {
        this.currentInvoiceFilter = filter;

        // Update active filter tab
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`)?.classList.add('active');

        this.renderInvoices();
    }

    // Show invoice detail
    showInvoiceDetail(invoiceId) {
        const invoice = this.data.facturas.find(i => i.id === invoiceId);
        if (!invoice) return;

        this.currentInvoice = invoice;

        document.getElementById('invoice-detail-title').textContent = `Factura #${invoice.id}`;
        document.getElementById('invoice-detail-number').textContent = invoice.id;
        document.getElementById('invoice-detail-client').textContent = invoice.cliente;
        document.getElementById('invoice-detail-date').textContent = this.formatDate(invoice.fecha);
        document.getElementById('invoice-detail-due').textContent = this.formatDate(invoice.vencimiento);

        const statusBadge = document.getElementById('invoice-detail-status');
        statusBadge.textContent = invoice.estado;
        statusBadge.className = `status-badge ${invoice.estado}`;

        // Render services
        const servicesContainer = document.getElementById('invoice-detail-services');
        servicesContainer.innerHTML = invoice.servicios.map(service => `
            <div class="service-detail-item">
                <span>${service.nombre} (${service.cantidad})</span>
                <span>€${(service.cantidad * service.precio).toLocaleString()}</span>
            </div>
        `).join('');

        // Calculate totals
        const subtotal = invoice.servicios.reduce((sum, service) => sum + (service.cantidad * service.precio), 0);
        const tax = subtotal * 0.21;
        const total = subtotal + tax;

        document.getElementById('invoice-detail-subtotal').textContent = '€' + subtotal.toLocaleString();
        document.getElementById('invoice-detail-tax').textContent = '€' + tax.toFixed(2);
        document.getElementById('invoice-detail-total').textContent = '€' + total.toLocaleString();

        // Notes
        const notesSection = document.getElementById('invoice-detail-notes-section');
        const notesText = document.getElementById('invoice-detail-notes');
        if (invoice.notas) {
            notesSection.style.display = 'block';
            notesText.textContent = invoice.notas;
        } else {
            notesSection.style.display = 'none';
        }

        // Show/hide mark as paid button
        const markPaidBtn = document.getElementById('mark-paid-btn');
        markPaidBtn.style.display = invoice.estado === 'Pagada' ? 'none' : 'inline-block';

        this.showModal('invoiceDetailModal');
    }

    // Mark invoice as paid
    markAsPaid() {
        if (this.currentInvoice) {
            this.currentInvoice.estado = 'Pagada';
            this.saveData();
            this.renderInvoices();
            this.updateMetrics();
            this.hideModal('invoiceDetailModal');
            this.showNotification('Factura marcada como pagada', 'success');
        }
    }

    // Populate client selector
    populateClientSelector() {
        const clientSelect = document.querySelector('#newInvoiceForm select[name="cliente"]');
        if (clientSelect) {
            clientSelect.innerHTML = '<option value="">Seleccionar cliente</option>' + 
                this.data.clientes.map(client => `<option value="${client.nombre}">${client.nombre}</option>`).join('');
        }
    }

    // Populate service selectors
    populateServiceSelectors() {
        const serviceSelects = document.querySelectorAll('.service-select');
        const options = '<option value="">Seleccionar servicio</option>' + 
            this.data.servicios.map(service => `<option value="${service.nombre}" data-price="${service.precio}">${service.nombre}</option>`).join('');

        serviceSelects.forEach(select => {
            select.innerHTML = options;
        });
    }

    // Update service price
    updateServicePrice(selectElement) {
        const selectedOption = selectElement.selectedOptions[0];
        if (selectedOption && selectedOption.dataset.price) {
            const row = selectElement.closest('.service-row');
            const priceInput = row.querySelector('input[name*="precio"]');
            priceInput.value = selectedOption.dataset.price;
            this.calculateInvoiceTotal();
        }
    }

    // Add service row
    addServiceRow() {
        const container = document.getElementById('invoice-services');
        const rowCount = container.children.length;

        const serviceOptions = '<option value="">Seleccionar servicio</option>' + 
            this.data.servicios.map(service => `<option value="${service.nombre}" data-price="${service.precio}">${service.nombre}</option>`).join('');

        const newRow = document.createElement('div');
        newRow.className = 'service-row';
        newRow.innerHTML = `
            <select name="servicios[${rowCount}][nombre]" class="service-select" onchange="app.updateServicePrice(this)">
                ${serviceOptions}
            </select>
            <input type="number" name="servicios[${rowCount}][cantidad]" placeholder="Cantidad" min="1" value="1">
            <input type="number" name="servicios[${rowCount}][precio]" placeholder="Precio" step="0.01" min="0">
            <button type="button" class="btn-remove" onclick="app.removeServiceRow(this)">-</button>
        `;

        container.appendChild(newRow);
    }

    // Remove service row
    removeServiceRow(button) {
        const row = button.closest('.service-row');
        if (row.parentElement.children.length > 1) {
            row.remove();
            this.calculateInvoiceTotal();
        }
    }

    // Calculate invoice total
    calculateInvoiceTotal() {
        const serviceRows = document.querySelectorAll('.service-row');
        let subtotal = 0;

        serviceRows.forEach(row => {
            const cantidad = parseFloat(row.querySelector('input[name*="cantidad"]').value) || 0;
            const precio = parseFloat(row.querySelector('input[name*="precio"]').value) || 0;
            subtotal += cantidad * precio;
        });

        const tax = subtotal * 0.21;
        const total = subtotal + tax;

        document.getElementById('invoice-subtotal').textContent = '€' + subtotal.toFixed(2);
        document.getElementById('invoice-tax').textContent = '€' + tax.toFixed(2);
        document.getElementById('invoice-total').textContent = '€' + total.toFixed(2);
    }

    // Set default dates
    setDefaultDates() {
        const today = new Date();
        const nextMonth = new Date(today);
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        const fechaInput = document.querySelector('#newInvoiceForm input[name="fecha"]');
        const vencimientoInput = document.querySelector('#newInvoiceForm input[name="vencimiento"]');

        if (fechaInput) fechaInput.value = this.formatDateForInput(today);
        if (vencimientoInput) vencimientoInput.value = this.formatDateForInput(nextMonth);
    }

    // Add new invoice
    addInvoice(formData) {
        const serviceRows = document.querySelectorAll('.service-row');
        const servicios = [];

        serviceRows.forEach((row, index) => {
            const nombre = row.querySelector('select').value;
            const cantidad = parseFloat(row.querySelector('input[name*="cantidad"]').value) || 0;
            const precio = parseFloat(row.querySelector('input[name*="precio"]').value) || 0;

            if (nombre && cantidad > 0 && precio > 0) {
                servicios.push({ nombre, cantidad, precio });
            }
        });

        if (servicios.length === 0) {
            this.showNotification('Debe agregar al menos un servicio', 'error');
            return;
        }

        const subtotal = servicios.reduce((sum, service) => sum + (service.cantidad * service.precio), 0);
        const tax = subtotal * 0.21;
        const total = subtotal + tax;

        const newInvoice = {
            id: (Math.max(...this.data.facturas.map(f => parseInt(f.id)), 0) + 1).toString().padStart(3, '0'),
            cliente: formData.get('cliente'),
            monto: Math.round(total),
            estado: formData.get('estado'),
            fecha: formData.get('fecha'),
            vencimiento: formData.get('vencimiento'),
            servicios: servicios,
            notas: formData.get('notas') || ''
        };

        this.data.facturas.push(newInvoice);

        // Update client invoice count
        const client = this.data.clientes.find(c => c.nombre === newInvoice.cliente);
        if (client) {
            client.facturas++;
            client.totalFacturado += newInvoice.monto;
        }

        this.saveData();
        this.renderInvoices();
        this.renderClients();
        this.updateMetrics();
        this.hideModal('newInvoiceModal');

        this.showNotification('Factura creada exitosamente', 'success');
    }

    // Render Services
    renderServices() {
        const serviceList = document.getElementById('service-list');
        if (!serviceList) return;

        serviceList.innerHTML = this.data.servicios.map(service => `
            <div class="service-item" onclick="app.showServiceDetail(${service.id})">
                <div class="service-header">
                    <div class="service-name">${service.nombre}</div>
                    <div class="service-price">€${service.precio}/${service.unidad}</div>
                </div>
                <div class="service-description">${service.descripcion}</div>
                <div class="service-stats">
                    <div>Vendido: ${service.vecesVendido} veces</div>
                    <div>Ingresos: €${service.ingresosGenerados.toLocaleString()}</div>
                </div>
            </div>
        `).join('');
    }

    // Show service detail
    showServiceDetail(serviceId) {
        const service = this.data.servicios.find(s => s.id === serviceId);
        if (!service) return;

        this.currentService = service;

        document.getElementById('service-detail-name').textContent = service.nombre;
        document.getElementById('service-detail-price').textContent = '€' + service.precio + '/' + service.unidad;
        document.getElementById('service-detail-unit').textContent = service.unidad;
        document.getElementById('service-detail-description').textContent = service.descripcion;
        document.getElementById('service-detail-sold').textContent = service.vecesVendido;
        document.getElementById('service-detail-revenue').textContent = '€' + service.ingresosGenerados.toLocaleString();

        this.showModal('serviceDetailModal');
    }

    // Add new service
    addService(formData) {
        const newService = {
            id: Math.max(...this.data.servicios.map(s => s.id), 0) + 1,
            nombre: formData.get('nombre'),
            precio: parseFloat(formData.get('precio')),
            unidad: formData.get('unidad'),
            descripcion: formData.get('descripcion') || '',
            vecesVendido: 0,
            ingresosGenerados: 0
        };

        this.data.servicios.push(newService);
        this.saveData();
        this.renderServices();
        this.updateMetrics();
        this.hideModal('newServiceModal');

        this.showNotification('Servicio agregado exitosamente', 'success');
    }

    // Export data
    exportData() {
        const dataStr = JSON.stringify(this.data, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'finanzas-backup-' + new Date().toISOString().split('T')[0] + '.json';
        link.click();
        URL.revokeObjectURL(url);

        this.showNotification('Datos exportados exitosamente', 'success');
    }

    // Clear data
    clearData() {
        if (confirm('¿Está seguro de que desea limpiar todos los datos? Esta acción no se puede deshacer.')) {
            localStorage.removeItem('financeAppData');
            location.reload();
        }
    }

    // Utility functions
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES');
    }

    formatDateForInput(date) {
        return date.toISOString().split('T')[0];
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '9999',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease'
        });

        // Set background color based on type
        const colors = {
            success: '#4CAF50',
            error: '#F44336',
            warning: '#FF9800',
            info: '#2196F3'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Placeholder functions for incomplete features
    editClient() {
        this.showNotification('Función en desarrollo', 'info');
    }

    deleteClient() {
        if (confirm('¿Está seguro de que desea eliminar este cliente?')) {
            this.data.clientes = this.data.clientes.filter(c => c.id !== this.currentClient.id);
            this.saveData();
            this.renderClients();
            this.updateMetrics();
            this.hideModal('clientProfileModal');
            this.showNotification('Cliente eliminado', 'success');
        }
    }

    shareInvoice() {
        this.showNotification('Compartir factura - función en desarrollo', 'info');
    }

    editInvoice() {
        this.showNotification('Editar factura - función en desarrollo', 'info');
    }

    deleteInvoice() {
        if (confirm('¿Está seguro de que desea eliminar esta factura?')) {
            this.data.facturas = this.data.facturas.filter(f => f.id !== this.currentInvoice.id);
            this.saveData();
            this.renderInvoices();
            this.updateMetrics();
            this.hideModal('invoiceDetailModal');
            this.showNotification('Factura eliminada', 'success');
        }
    }

    editService() {
        this.showNotification('Editar servicio - función en desarrollo', 'info');
    }

    deleteService() {
        if (confirm('¿Está seguro de que desea eliminar este servicio?')) {
            this.data.servicios = this.data.servicios.filter(s => s.id !== this.currentService.id);
            this.saveData();
            this.renderServices();
            this.updateMetrics();
            this.hideModal('serviceDetailModal');
            this.showNotification('Servicio eliminado', 'success');
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new FinanceApp();
});

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});
