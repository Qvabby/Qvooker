namespace Qvooker.Server
{
    /// <summary>
    /// This generic class is specially made for qvooker's service responses.
    /// </summary>
    public class ServiceResponse<T>
    {
        //data itself.
        public T? Data { get; set; }
        //description of service action.
        public string? Description { get; set; }
        //if we want to send any essential or more data other than type.
        public string? essentialData { get; set; }
        //incase we have error then what's service's message.
        public string? errorMessage { get; set; }
        //defaultly false.
        public bool ServiceSuccess { get; set; } = false;

    }
}
