[index (1).html](https://github.com/user-attachments/files/22454817/index.1.html)# rodrigotoro.github.io/[Uploading index <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Control de Finanzas</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="app">
        <!-- Header -->
        <header class="header">
            <h1 id="page-title">Control de Finanzas</h1>
            <div id="greeting" class="greeting">Hola, Usuario</div>
        </header>

        <!-- Main Content -->
        <main class="main-content">
            <!-- Dashboard Screen -->
            <div id="dashboard" class="screen active">
                <div class="metrics-grid">
                    <div class="metric-card income-current">
                        <div class="metric-label">Ingresos mes actual</div>
                        <div class="metric-value">€45,750</div>
                    </div>
                    <div class="metric-card income-previous">
                        <div class="metric-label">Ingresos mes anterior</div>
                        <div class="metric-value">€38,200</div>
                    </div>
                    <div class="metric-card pending">
                        <div class="metric-label">Facturas pendientes</div>
                        <div class="metric-value">12</div>
                    </div>
                    <div class="metric-card paid">
                        <div class="metric-label">Facturas pagadas</div>
                        <div class="metric-value">28</div>
                    </div>
                    <div class="metric-card overdue">
                        <div class="metric-label">Facturas vencidas</div>
                        <div class="metric-value">3</div>
                    </div>
                </div>

                <div class="chart-container">
                    <canvas id="incomeChart"></canvas>
                </div>

                <div class="quick-actions">
                    <h3>Acceso Rápido</h3>
                    <div class="quick-actions-grid">
                        <button class="quick-action-btn" onclick="app.switchTab('clientes')">
                            <span class="icon">👥</span>
                            Ver Clientes
                        </button>
                        <button class="quick-action-btn" onclick="app.showModal('newInvoiceModal')">
                            <span class="icon">📄</span>
                            Nueva Factura
                        </button>
                        <button class="quick-action-btn" onclick="app.switchTab('servicios')">
                            <span class="icon">⚙️</span>
                            Servicios
                        </button>
                    </div>
                </div>
            </div>

            <!-- Clients Screen -->
            <div id="clientes" class="screen">
                <div class="screen-header">
                    <h2>Mis Clientes</h2>
                    <div class="client-count">Total: <span id="client-count">0</span> clientes</div>
                </div>

                <div class="search-container">
                    <input type="text" id="client-search" placeholder="Buscar cliente..." class="search-input">
                </div>

                <div id="client-list" class="client-list">
                    <!-- Clients will be rendered here -->
                </div>

                <button class="fab" onclick="app.showModal('newClientModal')">+</button>
            </div>

            <!-- Invoices Screen -->
            <div id="facturas" class="screen">
                <div class="screen-header">
                    <h2>Gestión de Facturas</h2>
                </div>

                <div class="filter-tabs">
                    <button class="filter-tab active" data-filter="todas" onclick="app.filterInvoices('todas')">
                        Todas <span class="badge" id="all-count">0</span>
                    </button>
                    <button class="filter-tab" data-filter="Pagada" onclick="app.filterInvoices('Pagada')">
                        Pagadas <span class="badge success" id="paid-count">0</span>
                    </button>
                    <button class="filter-tab" data-filter="Pendiente" onclick="app.filterInvoices('Pendiente')">
                        Pendientes <span class="badge warning" id="pending-count">0</span>
                    </button>
                    <button class="filter-tab" data-filter="Vencida" onclick="app.filterInvoices('Vencida')">
                        Vencidas <span class="badge error" id="overdue-count">0</span>
                    </button>
                </div>

                <div id="invoice-list" class="invoice-list">
                    <!-- Invoices will be rendered here -->
                </div>

                <button class="fab" onclick="app.showModal('newInvoiceModal')">+</button>
            </div>

            <!-- Services Screen -->
            <div id="servicios" class="screen">
                <div class="screen-header">
                    <h2>Catálogo de Servicios</h2>
                    <div class="service-count">Total: <span id="service-count">0</span> servicios activos</div>
                </div>

                <div id="service-list" class="service-list">
                    <!-- Services will be rendered here -->
                </div>

                <button class="fab" onclick="app.showModal('newServiceModal')">+</button>
            </div>

            <!-- Config Screen -->
            <div id="config" class="screen">
                <div class="screen-header">
                    <h2>Configuración</h2>
                </div>

                <div class="config-sections">
                    <div class="config-section">
                        <h3>Perfil de Usuario</h3>
                        <div class="config-item">
                            <label>Nombre del negocio</label>
                            <input type="text" value="Mi Empresa SL" readonly>
                        </div>
                        <div class="config-item">
                            <label>Email</label>
                            <input type="email" value="contacto@miempresa.com" readonly>
                        </div>
                    </div>

                    <div class="config-section">
                        <h3>Configuración de Facturación</h3>
                        <div class="config-item">
                            <label>Moneda</label>
                            <select>
                                <option value="EUR">Euro (€)</option>
                                <option value="USD">Dólar ($)</option>
                            </select>
                        </div>
                        <div class="config-item">
                            <label>IVA por defecto</label>
                            <select>
                                <option value="21">21%</option>
                                <option value="10">10%</option>
                                <option value="4">4%</option>
                            </select>
                        </div>
                    </div>

                    <div class="config-section">
                        <h3>Datos y Backup</h3>
                        <button class="config-btn" onclick="app.exportData()">Exportar Datos</button>
                        <button class="config-btn" onclick="app.clearData()">Limpiar Datos</button>
                    </div>
                </div>
            </div>
        </main>

        <!-- Bottom Navigation -->
        <nav class="bottom-nav">
            <button class="nav-item active" data-tab="dashboard" onclick="app.switchTab('dashboard')">
                <span class="nav-icon">📊</span>
                <span class="nav-label">Dashboard</span>
            </button>
            <button class="nav-item" data-tab="clientes" onclick="app.switchTab('clientes')">
                <span class="nav-icon">👥</span>
                <span class="nav-label">Clientes</span>
            </button>
            <button class="nav-item" data-tab="facturas" onclick="app.switchTab('facturas')">
                <span class="nav-icon">📄</span>
                <span class="nav-label">Facturas</span>
            </button>
            <button class="nav-item" data-tab="servicios" onclick="app.switchTab('servicios')">
                <span class="nav-icon">⚙️</span>
                <span class="nav-label">Servicios</span>
            </button>
            <button class="nav-item" data-tab="config" onclick="app.switchTab('config')">
                <span class="nav-icon">⚙️</span>
                <span class="nav-label">Config</span>
            </button>
        </nav>

        <!-- Modals -->
        <!-- New Client Modal -->
        <div id="newClientModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Nuevo Cliente</h3>
                    <button class="modal-close" onclick="app.hideModal('newClientModal')">&times;</button>
                </div>
                <form id="newClientForm" class="modal-form">
                    <div class="form-group">
                        <label>Nombre</label>
                        <input type="text" name="nombre" required>
                    </div>
                    <div class="form-group">
                        <label>Teléfono</label>
                        <input type="tel" name="telefono" required>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label>Dirección</label>
                        <textarea name="direccion" rows="2"></textarea>
                    </div>
                    <div class="modal-actions">
                        <button type="button" class="btn-secondary" onclick="app.hideModal('newClientModal')">Cancelar</button>
                        <button type="submit" class="btn-primary">Guardar Cliente</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- New Invoice Modal -->
        <div id="newInvoiceModal" class="modal">
            <div class="modal-content large">
                <div class="modal-header">
                    <h3>Nueva Factura</h3>
                    <button class="modal-close" onclick="app.hideModal('newInvoiceModal')">&times;</button>
                </div>
                <form id="newInvoiceForm" class="modal-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Cliente</label>
                            <select name="cliente" required>
                                <option value="">Seleccionar cliente</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Fecha de Emisión</label>
                            <input type="date" name="fecha" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Fecha de Vencimiento</label>
                            <input type="date" name="vencimiento" required>
                        </div>
                        <div class="form-group">
                            <label>Estado</label>
                            <select name="estado">
                                <option value="Pendiente">Pendiente</option>
                                <option value="Pagada">Pagada</option>
                            </select>
                        </div>
                    </div>

                    <h4>Servicios</h4>
                    <div id="invoice-services" class="invoice-services">
                        <div class="service-row">
                            <select name="servicios[0][nombre]" class="service-select">
                                <option value="">Seleccionar servicio</option>
                            </select>
                            <input type="number" name="servicios[0][cantidad]" placeholder="Cantidad" min="1" value="1">
                            <input type="number" name="servicios[0][precio]" placeholder="Precio" step="0.01" min="0">
                            <button type="button" class="btn-remove" onclick="app.removeServiceRow(this)">-</button>
                        </div>
                    </div>
                    <button type="button" class="btn-add" onclick="app.addServiceRow()">+ Agregar Servicio</button>

                    <div class="form-group">
                        <label>Notas</label>
                        <textarea name="notas" rows="3" placeholder="Notas adicionales..."></textarea>
                    </div>

                    <div class="invoice-total">
                        <div class="total-row">
                            <span>Subtotal:</span>
                            <span id="invoice-subtotal">€0.00</span>
                        </div>
                        <div class="total-row">
                            <span>IVA (21%):</span>
                            <span id="invoice-tax">€0.00</span>
                        </div>
                        <div class="total-row total">
                            <span>Total:</span>
                            <span id="invoice-total">€0.00</span>
                        </div>
                    </div>

                    <div class="modal-actions">
                        <button type="button" class="btn-secondary" onclick="app.hideModal('newInvoiceModal')">Cancelar</button>
                        <button type="submit" class="btn-primary">Crear Factura</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- New Service Modal -->
        <div id="newServiceModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Nuevo Servicio</h3>
                    <button class="modal-close" onclick="app.hideModal('newServiceModal')">&times;</button>
                </div>
                <form id="newServiceForm" class="modal-form">
                    <div class="form-group">
                        <label>Nombre del servicio</label>
                        <input type="text" name="nombre" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Precio</label>
                            <input type="number" name="precio" step="0.01" min="0" required>
                        </div>
                        <div class="form-group">
                            <label>Unidad</label>
                            <select name="unidad">
                                <option value="hora">Por hora</option>
                                <option value="proyecto">Por proyecto</option>
                                <option value="mes">Por mes</option>
                                <option value="unidad">Por unidad</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Descripción</label>
                        <textarea name="descripcion" rows="3" placeholder="Describe el servicio..."></textarea>
                    </div>
                    <div class="modal-actions">
                        <button type="button" class="btn-secondary" onclick="app.hideModal('newServiceModal')">Cancelar</button>
                        <button type="submit" class="btn-primary">Guardar Servicio</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Client Profile Modal -->
        <div id="clientProfileModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 id="client-profile-name">Perfil del Cliente</h3>
                    <button class="modal-close" onclick="app.hideModal('clientProfileModal')">&times;</button>
                </div>
                <div class="client-profile-content">
                    <div class="client-info">
                        <div class="info-row">
                            <strong>Teléfono:</strong>
                            <span id="client-profile-phone"></span>
                        </div>
                        <div class="info-row">
                            <strong>Email:</strong>
                            <span id="client-profile-email"></span>
                        </div>
                        <div class="info-row">
                            <strong>Dirección:</strong>
                            <span id="client-profile-address"></span>
                        </div>
                        <div class="info-row">
                            <strong>Total Facturado:</strong>
                            <span id="client-profile-total" class="amount"></span>
                        </div>
                        <div class="info-row">
                            <strong>Facturas:</strong>
                            <span id="client-profile-invoices"></span>
                        </div>
                    </div>
                    <div class="client-actions">
                        <button class="btn-secondary" onclick="app.editClient()">Editar Cliente</button>
                        <button class="btn-danger" onclick="app.deleteClient()">Eliminar Cliente</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Invoice Detail Modal -->
        <div id="invoiceDetailModal" class="modal">
            <div class="modal-content large">
                <div class="modal-header">
                    <h3 id="invoice-detail-title">Detalle de Factura</h3>
                    <button class="modal-close" onclick="app.hideModal('invoiceDetailModal')">&times;</button>
                </div>
                <div class="invoice-detail-content">
                    <div class="invoice-header">
                        <div class="invoice-info">
                            <div class="info-row">
                                <strong>Número:</strong>
                                <span id="invoice-detail-number"></span>
                            </div>
                            <div class="info-row">
                                <strong>Cliente:</strong>
                                <span id="invoice-detail-client"></span>
                            </div>
                            <div class="info-row">
                                <strong>Fecha:</strong>
                                <span id="invoice-detail-date"></span>
                            </div>
                            <div class="info-row">
                                <strong>Vencimiento:</strong>
                                <span id="invoice-detail-due"></span>
                            </div>
                            <div class="info-row">
                                <strong>Estado:</strong>
                                <span id="invoice-detail-status" class="status-badge"></span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="invoice-services-detail">
                        <h4>Servicios</h4>
                        <div id="invoice-detail-services"></div>
                    </div>

                    <div class="invoice-totals">
                        <div class="total-row">
                            <span>Subtotal:</span>
                            <span id="invoice-detail-subtotal"></span>
                        </div>
                        <div class="total-row">
                            <span>IVA (21%):</span>
                            <span id="invoice-detail-tax"></span>
                        </div>
                        <div class="total-row total">
                            <span>Total:</span>
                            <span id="invoice-detail-total"></span>
                        </div>
                    </div>

                    <div class="invoice-notes" id="invoice-detail-notes-section">
                        <h4>Notas</h4>
                        <p id="invoice-detail-notes"></p>
                    </div>

                    <div class="invoice-actions">
                        <button class="btn-success" onclick="app.markAsPaid()" id="mark-paid-btn">Marcar como Pagada</button>
                        <button class="btn-primary" onclick="app.shareInvoice()">Compartir PDF</button>
                        <button class="btn-secondary" onclick="app.editInvoice()">Editar</button>
                        <button class="btn-danger" onclick="app.deleteInvoice()">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Service Detail Modal -->
        <div id="serviceDetailModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 id="service-detail-name">Detalle del Servicio</h3>
                    <button class="modal-close" onclick="app.hideModal('serviceDetailModal')">&times;</button>
                </div>
                <div class="service-detail-content">
                    <div class="service-info">
                        <div class="info-row">
                            <strong>Precio:</strong>
                            <span id="service-detail-price" class="amount"></span>
                        </div>
                        <div class="info-row">
                            <strong>Unidad:</strong>
                            <span id="service-detail-unit"></span>
                        </div>
                        <div class="info-row">
                            <strong>Descripción:</strong>
                            <span id="service-detail-description"></span>
                        </div>
                    </div>
                    
                    <div class="service-stats">
                        <h4>Estadísticas</h4>
                        <div class="stats-grid">
                            <div class="stat-card">
                                <div class="stat-value" id="service-detail-sold"></div>
                                <div class="stat-label">Veces vendido</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-value" id="service-detail-revenue"></div>
                                <div class="stat-label">Ingresos generados</div>
                            </div>
                        </div>
                    </div>

                    <div class="service-actions">
                        <button class="btn-secondary" onclick="app.editService()">Editar Servicio</button>
                        <button class="btn-danger" onclick="app.deleteService()">Eliminar Servicio</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="app.js"></script>
</body>
</html>(1).html…]()
[style.css](https://github.com/user-attachments/files/22454833/style.css)

/* Variables CSS */
:root {
    --primary-color: #2196F3;
    --secondary-color: #f5f5f5;
    --success-color: #4CAF50;
    --warning-color: #FF9800;
    --error-color: #F44336;
    --text-primary: #212121;
    --text-secondary: #757575;
    --background: #fafafa;
    --white: #ffffff;
    --shadow: 0 2px 4px rgba(0,0,0,0.1);
    --shadow-lg: 0 4px 12px rgba(0,0,0,0.15);
    --border-radius: 8px;
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
}

/* Reset y Base */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: var(--background);
    color: var(--text-primary);
    line-height: 1.6;
}

.app {
    max-width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* Header */
.header {
    background: var(--primary-color);
    color: var(--white);
    padding: var(--spacing-md) var(--spacing-md) var(--spacing-lg);
    text-align: center;
}

.header h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: var(--spacing-xs);
}

.greeting {
    font-size: 0.9rem;
    opacity: 0.9;
}

/* Main Content */
.main-content {
    flex: 1;
    padding: var(--spacing-md);
    padding-bottom: 80px; /* Space for bottom nav */
}

.screen {
    display: none;
    animation: fadeIn 0.3s ease-in-out;
}

.screen.active {
    display: block;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Screen Headers */
.screen-header {
    margin-bottom: var(--spacing-lg);
    text-align: center;
}

.screen-header h2 {
    font-size: 1.4rem;
    color: var(--text-primary);
    margin-bottom: var(--spacing-xs);
}

.client-count, .service-count {
    color: var(--text-secondary);
    font-size: 0.9rem;
}

/* Dashboard */
.metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
}

.metric-card {
    background: var(--white);
    padding: var(--spacing-md);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    text-align: center;
    border-left: 4px solid var(--primary-color);
}

.metric-card.pending { border-left-color: var(--warning-color); }
.metric-card.paid { border-left-color: var(--success-color); }
.metric-card.overdue { border-left-color: var(--error-color); }

.metric-label {
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin-bottom: var(--spacing-xs);
}

.metric-value {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
}

.chart-container {
    background: var(--white);
    padding: var(--spacing-md);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    margin-bottom: var(--spacing-lg);
    height: 300px;
}

.quick-actions {
    background: var(--white);
    padding: var(--spacing-md);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
}

.quick-actions h3 {
    margin-bottom: var(--spacing-md);
    font-size: 1.1rem;
}

.quick-actions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: var(--spacing-md);
}

.quick-action-btn {
    background: var(--secondary-color);
    border: none;
    padding: var(--spacing-md);
    border-radius: var(--border-radius);
    cursor: pointer;
    text-align: center;
    transition: all 0.2s;
}

.quick-action-btn:hover {
    background: var(--primary-color);
    color: var(--white);
    transform: translateY(-2px);
}

.quick-action-btn .icon {
    display: block;
    font-size: 1.5rem;
    margin-bottom: var(--spacing-xs);
}

/* Search */
.search-container {
    margin-bottom: var(--spacing-lg);
}

.search-input {
    width: 100%;
    padding: var(--spacing-md);
    border: 1px solid #ddd;
    border-radius: var(--border-radius);
    font-size: 1rem;
}

/* Client List */
.client-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.client-item {
    background: var(--white);
    padding: var(--spacing-md);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    cursor: pointer;
    transition: transform 0.2s;
}

.client-item:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.client-name {
    font-weight: 600;
    margin-bottom: var(--spacing-xs);
}

.client-info {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin-bottom: var(--spacing-sm);
}

.client-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.client-invoices {
    font-size: 0.8rem;
    color: var(--text-secondary);
}

.view-profile-btn {
    background: var(--primary-color);
    color: var(--white);
    border: none;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--border-radius);
    cursor: pointer;
    font-size: 0.9rem;
}

/* Filter Tabs */
.filter-tabs {
    display: flex;
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    margin-bottom: var(--spacing-lg);
    overflow-x: auto;
}

.filter-tab {
    flex: 1;
    background: transparent;
    border: none;
    padding: var(--spacing-md);
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s;
    white-space: nowrap;
}

.filter-tab.active {
    background: var(--primary-color);
    color: var(--white);
}

.badge {
    background: var(--text-secondary);
    color: var(--white);
    padding: 2px 6px;
    border-radius: 10px;
    font-size: 0.7rem;
    margin-left: var(--spacing-xs);
}

.badge.success { background: var(--success-color); }
.badge.warning { background: var(--warning-color); }
.badge.error { background: var(--error-color); }

/* Invoice List */
.invoice-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.invoice-item {
    background: var(--white);
    padding: var(--spacing-md);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    cursor: pointer;
    transition: transform 0.2s;
}

.invoice-item:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.invoice-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-sm);
}

.invoice-number {
    font-weight: 600;
}

.invoice-amount {
    font-weight: 600;
    font-size: 1.1rem;
}

.invoice-client {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-xs);
}

.invoice-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
}

.invoice-date {
    color: var(--text-secondary);
}

.status-badge {
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
}

.status-badge.Pagada {
    background: var(--success-color);
    color: var(--white);
}

.status-badge.Pendiente {
    background: var(--warning-color);
    color: var(--white);
}

.status-badge.Vencida {
    background: var(--error-color);
    color: var(--white);
}

/* Service List */
.service-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.service-item {
    background: var(--white);
    padding: var(--spacing-md);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    cursor: pointer;
    transition: transform 0.2s;
}

.service-item:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.service-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-sm);
}

.service-name {
    font-weight: 600;
}

.service-price {
    font-weight: 600;
    color: var(--primary-color);
}

.service-description {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-sm);
    font-size: 0.9rem;
}

.service-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-md);
    font-size: 0.8rem;
    color: var(--text-secondary);
}

/* Config Screen */
.config-sections {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.config-section {
    background: var(--white);
    padding: var(--spacing-md);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
}

.config-section h3 {
    margin-bottom: var(--spacing-md);
    font-size: 1.1rem;
    color: var(--text-primary);
}

.config-item {
    margin-bottom: var(--spacing-md);
}

.config-item:last-child {
    margin-bottom: 0;
}

.config-item label {
    display: block;
    margin-bottom: var(--spacing-xs);
    font-weight: 500;
    color: var(--text-primary);
}

.config-item input,
.config-item select {
    width: 100%;
    padding: var(--spacing-sm);
    border: 1px solid #ddd;
    border-radius: var(--border-radius);
    font-size: 1rem;
}

.config-btn {
    background: var(--primary-color);
    color: var(--white);
    border: none;
    padding: var(--spacing-md);
    border-radius: var(--border-radius);
    cursor: pointer;
    margin-right: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
}

/* Floating Action Button */
.fab {
    position: fixed;
    bottom: 90px;
    right: var(--spacing-md);
    width: 56px;
    height: 56px;
    background: var(--primary-color);
    color: var(--white);
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: var(--shadow-lg);
    transition: transform 0.2s;
}

.fab:hover {
    transform: scale(1.1);
}

/* Bottom Navigation */
.bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--white);
    display: flex;
    border-top: 1px solid #eee;
    box-shadow: 0 -2px 8px rgba(0,0,0,0.1);
}

.nav-item {
    flex: 1;
    background: transparent;
    border: none;
    padding: var(--spacing-sm);
    cursor: pointer;
    text-align: center;
    transition: color 0.2s;
}

.nav-item.active {
    color: var(--primary-color);
}

.nav-icon {
    display: block;
    font-size: 1.2rem;
    margin-bottom: 4px;
}

.nav-label {
    font-size: 0.7rem;
    display: block;
}

/* Modals */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 1000;
}

.modal.active {
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s;
}

.modal-content {
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-lg);
    max-width: 90vw;
    max-height: 90vh;
    overflow-y: auto;
    margin: var(--spacing-md);
}

.modal-content.large {
    max-width: 95vw;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md);
    border-bottom: 1px solid #eee;
}

.modal-header h3 {
    margin: 0;
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-secondary);
}

.modal-form {
    padding: var(--spacing-md);
}

.form-group {
    margin-bottom: var(--spacing-md);
}

.form-group label {
    display: block;
    margin-bottom: var(--spacing-xs);
    font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: var(--spacing-sm);
    border: 1px solid #ddd;
    border-radius: var(--border-radius);
    font-size: 1rem;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-md);
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-sm);
    margin-top: var(--spacing-lg);
    padding-top: var(--spacing-md);
    border-top: 1px solid #eee;
}

/* Buttons */
.btn-primary {
    background: var(--primary-color);
    color: var(--white);
    border: none;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--border-radius);
    cursor: pointer;
    font-size: 0.9rem;
}

.btn-secondary {
    background: var(--secondary-color);
    color: var(--text-primary);
    border: 1px solid #ddd;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--border-radius);
    cursor: pointer;
    font-size: 0.9rem;
}

.btn-success {
    background: var(--success-color);
    color: var(--white);
    border: none;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--border-radius);
    cursor: pointer;
    font-size: 0.9rem;
}

.btn-danger {
    background: var(--error-color);
    color: var(--white);
    border: none;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--border-radius);
    cursor: pointer;
    font-size: 0.9rem;
}

/* Invoice Services */
.invoice-services {
    margin-bottom: var(--spacing-md);
}

.service-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr auto;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
    align-items: center;
}

.service-select {
    padding: var(--spacing-xs);
}

.btn-remove {
    background: var(--error-color);
    color: var(--white);
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
}

.btn-add {
    background: var(--success-color);
    color: var(--white);
    border: none;
    padding: var(--spacing-sm);
    border-radius: var(--border-radius);
    cursor: pointer;
    margin-bottom: var(--spacing-md);
}

.invoice-total {
    background: var(--secondary-color);
    padding: var(--spacing-md);
    border-radius: var(--border-radius);
    margin-bottom: var(--spacing-md);
}

.total-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing-xs);
}

.total-row.total {
    font-weight: 600;
    font-size: 1.1rem;
    border-top: 1px solid #ddd;
    padding-top: var(--spacing-xs);
}

/* Client Profile Modal */
.client-profile-content {
    padding: var(--spacing-md);
}

.client-info {
    margin-bottom: var(--spacing-lg);
}

.info-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing-sm);
    padding-bottom: var(--spacing-sm);
    border-bottom: 1px solid #eee;
}

.amount {
    color: var(--primary-color);
    font-weight: 600;
}

.client-actions {
    display: flex;
    gap: var(--spacing-sm);
}

/* Invoice Detail Modal */
.invoice-detail-content {
    padding: var(--spacing-md);
}

.invoice-header {
    margin-bottom: var(--spacing-lg);
}

.invoice-services-detail {
    margin-bottom: var(--spacing-lg);
}

.invoice-services-detail h4 {
    margin-bottom: var(--spacing-md);
}

.service-detail-item {
    display: flex;
    justify-content: space-between;
    padding: var(--spacing-sm);
    background: var(--secondary-color);
    margin-bottom: var(--spacing-xs);
    border-radius: var(--border-radius);
}

.invoice-totals {
    background: var(--secondary-color);
    padding: var(--spacing-md);
    border-radius: var(--border-radius);
    margin-bottom: var(--spacing-lg);
}

.invoice-notes {
    margin-bottom: var(--spacing-lg);
}

.invoice-notes h4 {
    margin-bottom: var(--spacing-sm);
}

.invoice-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
}

/* Service Detail Modal */
.service-detail-content {
    padding: var(--spacing-md);
}

.service-stats {
    margin-bottom: var(--spacing-lg);
}

.service-stats h4 {
    margin-bottom: var(--spacing-md);
}

.stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-md);
}

.stat-card {
    text-align: center;
    padding: var(--spacing-md);
    background: var(--secondary-color);
    border-radius: var(--border-radius);
}

.stat-value {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--primary-color);
}

.stat-label {
    font-size: 0.9rem;
    color: var(--text-secondary);
}

.service-actions {
    display: flex;
    gap: var(--spacing-sm);
}

/* Responsive Design */
@media (max-width: 768px) {
    .form-row {
        grid-template-columns: 1fr;
    }

    .service-row {
        grid-template-columns: 1fr;
        gap: var(--spacing-xs);
    }

    .metrics-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .quick-actions-grid {
        grid-template-columns: 1fr;
    }

    .invoice-actions,
    .client-actions,
    .service-actions {
        flex-direction: column;
    }
}

@media (max-width: 480px) {
    .metrics-grid {
        grid-template-columns: 1fr;
    }

    .filter-tabs {
        overflow-x: auto;
    }

    .modal-content {
        margin: var(--spacing-xs);
        max-width: calc(100vw - 16px);
    }
}
[app.js](https://github.com/user-attachments/files/22454834/app.js)

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
