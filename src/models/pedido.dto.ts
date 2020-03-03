import { ReferenciaDTO } from "./referencia.dto";
import { PagamentoDTO } from "./pagamento.dto";
import { ItemPedidoDTO } from "./item-pedido.dto";

export interface PedidoDTO {
    cliente: ReferenciaDTO;
    enderecoDeEntrega: ReferenciaDTO;
    pagamento: PagamentoDTO;
    itens: ItemPedidoDTO[];
}