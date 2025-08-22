use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;

Route::get('/categorias', [CategoryController::class, 'index']);
Route::post('/categorias', [CategoryController::class, 'store']);
